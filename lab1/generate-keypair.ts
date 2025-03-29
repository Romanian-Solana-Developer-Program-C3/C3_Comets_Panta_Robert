import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate(); // API that creates a KeyPair (public key & private key)

console.log("🎉 Keypair generated successfully!!");
console.log("🔑 PublicKey", keypair.publicKey.toBase58()); // Used to receive funds and for identification on the blockchain.
console.log("⚠️ SecretKey", keypair.secretKey); // Used to sign transactions and must be kept secret.
