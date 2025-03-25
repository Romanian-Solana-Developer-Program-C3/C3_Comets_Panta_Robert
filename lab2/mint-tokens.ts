import {
    getExplorerLink,
    getKeypairFromEnvironment,
  } from "@solana-developers/helpers";
  import { createMint, mintTo } from "@solana/spl-token";
  import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
  import "dotenv/config";
  
  import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
  
  const MINT = new PublicKey("2ZvKo6vHjAcJeHpr6EzzWqCYm2BZYngWYhbyDT5v5fy7");
  
  async function mintToken(amount: number, mint: PublicKey) {
    console.log(`Minting token ${mint.toBase58()}...`);
  
    const connection = new Connection(clusterApiUrl("devnet"));
    const kp = getKeypairFromEnvironment("SECRET_KEY");
  
    // Try to get or create the associated token account
    let ata;
    try {
      ata = await getOrCreateAssociatedTokenAccount(
        connection,
        kp,
        mint,
        kp.publicKey
      );
      console.log("Associated Token Account created/found:", ata.address.toBase58());
    } catch (error) {
      console.error("Error getting/creating associated token account:", error);
      return;
    }
  
    // Proceed with minting tokens
    try {
      const sig = await mintTo(connection, kp, mint, ata.address, kp, amount);
      const link = getExplorerLink("tx", sig, "devnet");
      console.log(`✅ Done with link: ${link}`);
    } catch (error) {
      console.error("Error minting token:", error);
    }
  }
  
  mintToken(10 * 10 ** 9, MINT);
  