// Load environment variables from a .env file
import "dotenv/config";

// Import necessary functions from the @metaplex-foundation/umi library
import {
  createSignerFromKeypair, // Function to create a signer from a keypair
  signerIdentity,          // Function to set signer identity
} from "@metaplex-foundation/umi";

// Import other dependencies for creating the UMI instance and handling transactions
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"; 
import { getKeypairFromEnvironment } from "@solana-developers/helpers"; // For loading the secret key from environment
import { clusterApiUrl } from "@solana/web3.js"; // Provides URL for the Solana cluster
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"; // Provides functionality to upload assets to Irys

// Load the secret key from the environment variable 'SECRET_KEY'
const kp = getKeypairFromEnvironment("SECRET_KEY");

// Create a UMI instance for interacting with the Solana blockchain (using the devnet cluster)
const umi = createUmi(clusterApiUrl("devnet"));

// Create a keypair using the secret key loaded earlier
const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);

// Create a signer from the keypair, used to authorize transactions
const signer = createSignerFromKeypair(umi, keypair);

// Add Irys uploader and signer identity functionality to the UMI instance
umi.use(irysUploader()); // Enables uploading functionality via Irys
umi.use(signerIdentity(signer)); // Adds the created signer identity for authorization

// Define the URI of the image for the metadata
const IMG_URI =
  "https://devnet.irys.xyz/7PwXAgBB6EH1FUBoktEGYdXQn2brD2hUYyxyMMDLGwB2";

// Define the URI for the metadata (can be used later for linking the NFT)
const METADATA_URI =
  "https://devnet.irys.xyz/2eXS7i2a8ZQvBrsLjx4bTVy4E97kHo83Qck8yGHKNX2r";

// Async function to upload metadata for an NFT
async function uploadMetadata() {
  try {
    // Create metadata object for the NFT (name, symbol, description, image, and attributes)
    const metadata = {
      name: "Comets RUG", // The name of the NFT
      symbol: "CRUG",     // The symbol of the NFT (used for token identification)
      description: "This is a Stellar RUG", // Description of the NFT
      image: IMG_URI, // Image URI for the NFT
      attributes: [
        { trait_type: "Color", value: "red" }, // Define attributes like color
        { trait_type: "Material", value: "wool" }, // Define attributes like material
        { trait_type: "Size", value: "very big" }, // Define attributes like size
      ],
      properties: {
        files: [{ type: "image/png", uri: IMG_URI }], // Define the file type and URI for the NFT image
      },
    };

    // Upload the metadata to the Irys uploader and get the metadata URI
    const metadataUri = await umi.uploader.uploadJson(metadata);

    // Log the URI of the uploaded metadata to the console
    console.log("✅ Done with metadata URI:", metadataUri);
  } catch (error) {
    // Log any error that occurs during the metadata upload
    console.error("[uploadMetadata] Failed with:", error);
  }
}

// Call the uploadMetadata function to upload the NFT metadata
uploadMetadata();
