import "dotenv/config";  // Load environment variables from .env file

// Importing necessary functions from Metaplex and Solana libraries
import {
  createSignerFromKeypair,  // Function to create a signer from a keypair
  generateSigner,           // Function to generate a new signer
  percentAmount,            // Function to calculate a percentage amount
  signerIdentity,           // Function to specify the identity of the signer
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";  // UMI bundle default creation function
import { getKeypairFromEnvironment } from "@solana-developers/helpers";  // Function to get the keypair from environment variables
import { clusterApiUrl } from "@solana/web3.js";  // Solana web3 library for connecting to the blockchain
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";  // Function for uploading NFTs
import {
  createNft,  // Function to create an NFT
  mplTokenMetadata,  // Function for token metadata creation
} from "@metaplex-foundation/mpl-token-metadata";  // Metaplex's token metadata module
import { base58 } from "@metaplex-foundation/umi/serializers";  // Serializer for base58 encoding

// Load the keypair from the environment variable "SECRET_KEY"
const kp = getKeypairFromEnvironment("SECRET_KEY");

// Create a UMI instance connected to Solana Devnet
const umi = createUmi(clusterApiUrl("devnet"));

// Create a keypair from the secret key and create a signer
const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

// Set up the UMI with the token metadata and signer identity
umi.use(mplTokenMetadata());
umi.use(signerIdentity(signer));

// URI for the image and metadata of the NFT
const IMG_URI =
  "https://devnet.irys.xyz/7PwXAgBB6EH1FUBoktEGYdXQn2brD2hUYyxyMMDLGwB2";  // Image URI for the NFT
const METADATA_URI =
  "https://devnet.irys.xyz/2eXS7i2a8ZQvBrsLjx4bTVy4E97kHo83Qck8yGHKNX2r";  // Metadata URI for the NFT

// Function to create the NFT
async function createMyNft() {
  try {
    // Generate a signer for the mint (NFT token)
    const mint = generateSigner(umi);

    // Create a transaction to mint the NFT with metadata
    let tx = createNft(umi, {
      name: "Comets RUG",  // Name of the NFT
      mint,  // Mint address of the NFT
      authority: signer,  // Authority (signer) who can manage the NFT
      sellerFeeBasisPoints: percentAmount(100),  // Seller fee (1% in this case)
      isCollection: false,  // Whether the NFT is part of a collection
      uri: METADATA_URI,  // URI pointing to the metadata of the NFT
    });

    // Send the transaction and confirm it
    let result = await tx.sendAndConfirm(umi);
    
    // Deserialize the signature and print it
    const signature = base58.deserialize(result.signature);

    console.log("✅ Done! with sig:", signature);  // Log success and the transaction signature
  } catch (error) {
    // If there is an error, log it
    console.error("[createMyNft] Failed with:", error);
  }
}

// Call the function to create the NFT
createMyNft();
