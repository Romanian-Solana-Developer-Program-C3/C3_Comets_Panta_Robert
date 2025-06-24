import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";  // Importing helper functions for key management and explorer links

import { createMint, mintTo } from "@solana/spl-token";  // Importing Solana token functions

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"; // Importing Solana web3 utilities

import "dotenv/config";  // Loading environment variables

import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token"; // Importing function to manage token accounts

// Define the mint address of the token (replace this with your actual token mint address)
const MINT = new PublicKey("7fv1iZ48FZfccWM6Eybao48SE1fqzZ1zw2WeCzMBhsaa");

async function mintToken(amount: number, mint: PublicKey) {
  console.log(`Minting token ${mint.toBase58()}...`); // Log the minting process

  // Establish a connection to the Solana devnet
  const connection = new Connection(clusterApiUrl("devnet"));

  // Retrieve the keypair from environment variables (used as the authority)
  const kp = getKeypairFromEnvironment("SECRET_KEY");

  // Get or create an associated token account (ATA) for the owner to hold the minted tokens
  const ata = await getOrCreateAssociatedTokenAccount(
      connection, // Solana connection
      kp, // Payer (who pays for the transaction)
      mint, // Token mint address
      kp.publicKey // Owner of the account
  );

  // Mint tokens to the associated token account
  const sig = await mintTo(
      connection, // Solana connection
      kp, // Payer (authority)
      mint, // Token mint address
      ata.address, // Associated Token Account (ATA) to receive tokens
      kp, // Authority that has minting rights
      amount // Number of tokens to mint (10 * 10^9 in this case)
  );

  // Generate a Solana explorer link to view the transaction
  const link = getExplorerLink("tx", sig, "devnet");

  console.log(`✅ Done with link: ${link}`); // Log success with a link to the transaction
}

// Call the function to mint 10 tokens (10 * 10^9 because of 9 decimals)
mintToken(10 * 10 ** 9, MINT);
