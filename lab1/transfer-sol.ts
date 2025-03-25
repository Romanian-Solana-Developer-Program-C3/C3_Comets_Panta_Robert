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
 * Trimite SOL de la un wallet la altul.
 * @param connection - Conexiunea la rețeaua Solana
 * @param senderKeypair - Cheia privată a expeditorului
 * @param recipientPubKey - Adresa publică a destinatarului
 * @param amountInLamports - Cantitatea de SOL în Lamports
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

    console.log(`✅ Tranzacție reușită! Signature: ${signature}`);
    return true;
  } catch (error) {
    console.error("❌ Eroare la trimiterea SOL:", error);
    return false;
  }
}

/**
 * Funcția principală care inițiază transferul de SOL
 */
async function main() {
  try {
    // Citirea adresei destinatarului din argumentele CLI
    const args = process.argv;
    const recipientPubKeyString = args.find(
      (arg, index) => index > 1 && arg && !arg.startsWith("--")
    );

    if (!recipientPubKeyString) {
      console.error("❌ Eroare: Trebuie să specifici o adresă publică validă.");
      console.log("🔹 Utilizare: npx tsx transfer-sol.ts <recipient-public-key>");
      return;
    }

    let recipientPubKey: PublicKey;
    try {
      recipientPubKey = new PublicKey(recipientPubKeyString);
    } catch (error) {
      console.error("❌ Adresa destinatarului este invalidă:", recipientPubKeyString);
      return;
    }

    // Obținerea cheii private din variabilele de mediu
    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
    console.log("📩 Expeditor:", senderKeypair.publicKey.toString());

    // Conectare la rețeaua Solana (Devnet)
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Definirea sumei de trimis (0.5 SOL)
    const amountToSend = LAMPORTS_PER_SOL * 0.5;

    // Verificarea soldului expeditorului
    const senderBalance = await connection.getBalance(senderKeypair.publicKey);
    console.log(`💰 Sold expeditor: ${senderBalance / LAMPORTS_PER_SOL} SOL`);

    if (senderBalance < amountToSend + 5000) {
      console.log("⚠️ Fonduri insuficiente pentru tranzacție!");
      return;
    }

    // Trimiterea SOL
    const success = await sendSol(connection, senderKeypair, recipientPubKey, amountToSend);
    if (!success) return;

    // Afișarea soldului final al expeditorului și destinatarului
    const senderFinalBalance = await connection.getBalance(senderKeypair.publicKey);
    const recipientFinalBalance = await connection.getBalance(recipientPubKey);
    console.log(`💰 Sold final expeditor: ${senderFinalBalance / LAMPORTS_PER_SOL} SOL`);
    console.log(`🎉 Sold destinatar: ${recipientFinalBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (error) {
    console.error("❌ Eroare în funcția principală:", error);
  }
}

console.log("🚀 Începem transferul SOL...");
main();
