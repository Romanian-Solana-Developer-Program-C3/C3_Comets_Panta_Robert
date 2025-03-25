import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate(); //API care creaza un KeyPair (cheie publica & cheie privata)

console.log("✅ Keypair generated successfully!!");
console.log("✅ PublicKey", keypair.publicKey.toBase58());
console.log("✅ SecretKey", keypair.secretKey);

