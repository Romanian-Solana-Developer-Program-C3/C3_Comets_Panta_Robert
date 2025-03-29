import "dotenv/config";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import {
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";

// Retrieve the keypair from the environment variable (stored securely in .env)
const keypair = getKeypairFromEnvironment("SECRET_KEY");

// Establish a connection to the Solana Devnet (test network)
const connection = new Connection(clusterApiUrl("devnet"));

// Extract the public key from the keypair
const pubkey = keypair.publicKey;

// Request an airdrop of 1 SOL if the balance is insufficient
await airdropIfRequired(connection, pubkey, LAMPORTS_PER_SOL, LAMPORTS_PER_SOL);

// Fetch the current account balance in Lamports (1 SOL = 1,000,000,000 Lamports)
const balanceInLamports = await connection.getBalance(pubkey);

// Convert Lamports to SOL and display the balance
console.log(`${pubkey.toString()} has balance ${balanceInLamports / LAMPORTS_PER_SOL} SOL`);