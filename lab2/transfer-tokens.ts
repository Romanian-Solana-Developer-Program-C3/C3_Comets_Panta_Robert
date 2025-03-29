import "dotenv/config"; // Load environment variables from .env file
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers"; // Import utility functions for Solana development
import {
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  transferChecked,
} from "@solana/spl-token"; // Import functions for handling token transfers on Solana
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"; // Solana web3 library for blockchain interaction

// Define the mint address of the token being transferred
const MINT = new PublicKey("7fv1iZ48FZfccWM6Eybao48SE1fqzZ1zw2WeCzMBhsaa");
// Define the source wallet address
const SRC = new PublicKey("2ZvKo6vHjAcJeHpr6EzzWqCYm2BZYngWYhbyDT5v5fy7");
// Define the destination wallet address
const DST = new PublicKey("2ZvKo6vHjAcJeHpr6EzzWqCYm2BZYngWYhbyDT5v5fy7");

async function transferToken(
  mint: PublicKey,
  source: PublicKey,
  dest: PublicKey,
  amount: number,
) {
  console.log(`Transferring token ${mint} ...`);

  // Establish a connection to the Solana Devnet
  const connection = new Connection(clusterApiUrl("devnet"));
  // Retrieve the keypair from environment variables
  const kp = getKeypairFromEnvironment("SECRET_KEY");

  // Get the associated token account address for the source wallet
  const sourceAta = getAssociatedTokenAddressSync(mint, source);
  // Get or create the associated token account for the destination wallet
  const destAta = await getOrCreateAssociatedTokenAccount(
    connection,
    kp,
    mint,
    dest,
  );

  // Perform the token transfer
  const sig = await transferChecked(
    connection,
    kp, // Payer's keypair
    sourceAta, // Source token account
    mint, // Mint address
    destAta.address, // Destination token account
    kp, // Owner of the source account
    amount, // Amount to transfer (in smallest units, i.e., lamports)
    9, // Token decimals (assuming 9 for SPL tokens)
  );

  // Generate and log the transaction link
  const link = getExplorerLink("tx", sig, "devnet");
  console.log(`✅ Done with link: ${link}`);
}

// Call the function to transfer 1 token (1 * 10^9 in smallest units)
transferToken(MINT, SRC, DST, 1 * 10 ** 9);
