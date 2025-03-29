import {
  getExplorerLink, // Utility function to generate an explorer link for blockchain transactions
  getKeypairFromEnvironment, // Function to retrieve a keypair from environment variables
} from "@solana-developers/helpers";

import { createMint } from "@solana/spl-token"; // Function to create a new token mint on Solana
import { Connection, clusterApiUrl } from "@solana/web3.js"; // Solana's web3 library for blockchain interaction

import "dotenv/config"; // Load environment variables from a .env file

async function createTokenMint() {
  console.log("Creating mint...");

  // Establish a connection to the Solana devnet blockchain
  const connection = new Connection(clusterApiUrl("devnet"));

  // Retrieve the keypair from the environment variable (SECRET_KEY)
  const kp = getKeypairFromEnvironment("SECRET_KEY");

  // Create a new token mint with 9 decimal places, using the keypair as the mint authority
  const mint = await createMint(connection, kp, kp.publicKey, null, 9);

  // Generate an explorer link to view the newly created mint on Solana Devnet
  const link = getExplorerLink("address", mint.toBase58(), "devnet");

  console.log("✅ Created mint with link:", link);
}

// Execute the function to create the token mint
createTokenMint();
