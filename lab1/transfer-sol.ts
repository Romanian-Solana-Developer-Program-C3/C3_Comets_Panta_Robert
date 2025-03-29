import * as dotenv from "dotenv";
dotenv.config();

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

/**
 * Sends SOL from one wallet to another.
 * @param connection - Solana network connection
 * @param senderKeypair - Sender's private key
 * @param recipientPubKey - Recipient's public address
 * @param amountInLamports - Amount of SOL in Lamports
 */
async function sendSol(
  connection: Connection,
  senderKeypair: any,
  recipientPubKey: PublicKey,
  amountInLamports: number
): Promise<boolean> {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientPubKey,
        lamports: amountInLamports,
      })
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [senderKeypair],
      { commitment: "confirmed" }
    );

    console.log(`✅ Transaction successful! Signature: ${signature}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending SOL:", error);
    return false;
  }
}

/**
 * Main function to initiate the SOL transfer
 */
async function main() {
  try {
    // Read recipient's address from CLI arguments
    const args = process.argv;
    const recipientPubKeyString = args.find(
      (arg, index) => index > 1 && arg && !arg.startsWith("--")
    );

    if (!recipientPubKeyString) {
      console.error("❌ Error: You must provide a valid public address.");
      console.log("🔹 Usage: npx tsx transfer-sol.ts <recipient-public-key>");
      return;
    }

    let recipientPubKey: PublicKey;
    try {
      recipientPubKey = new PublicKey(recipientPubKeyString);
    } catch (error) {
      console.error("❌ Invalid recipient address:", recipientPubKeyString);
      return;
    }

    // Retrieve sender's private key from environment variables
    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log("📩 Sender:", senderKeypair.publicKey.toString());

    // Connect to the Solana network (Devnet)
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Define the amount to send (0.5 SOL)
    const amountToSend = LAMPORTS_PER_SOL * 0.5;

    // Check sender's balance
    const senderBalance = await connection.getBalance(senderKeypair.publicKey);
    console.log(`💰 Sender balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);

    if (senderBalance < amountToSend + 5000) {
      console.log("⚠️ Insufficient funds for transaction!");
      return;
    }

    // Send SOL
    const success = await sendSol(connection, senderKeypair, recipientPubKey, amountToSend);
    if (!success) return;

    // Display final balances of sender and recipient
    const senderFinalBalance = await connection.getBalance(senderKeypair.publicKey);
    const recipientFinalBalance = await connection.getBalance(recipientPubKey);
    console.log(`💰 Final sender balance: ${senderFinalBalance / LAMPORTS_PER_SOL} SOL`);
    console.log(`🎉 Recipient balance: ${recipientFinalBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (error) {
    console.error("❌ Error in main function:", error);
  }
}

console.log("🚀 Starting SOL transfer...");
main();
