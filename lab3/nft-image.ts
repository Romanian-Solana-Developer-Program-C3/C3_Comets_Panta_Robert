// Load environment variables from a .env file
import "dotenv/config";

// Import necessary functions from the @metaplex-foundation/umi library
import {
  createGenericFile,  // Function to create a generic file object (for non-json files)
  createSignerFromKeypair, // Function to create a signer from a keypair
  signerIdentity,          // Function to set signer identity
} from "@metaplex-foundation/umi";

// Import other dependencies for creating the UMI instance and handling transactions
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"; 
import { getKeypairFromEnvironment } from "@solana-developers/helpers"; // For loading the secret key from environment
import { clusterApiUrl } from "@solana/web3.js"; // Provides URL for the Solana cluster
import { readFile } from "fs/promises"; // Promises-based file reading for non-blocking operations
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

// Define the path to the image file you want to upload
const IMAGE_FILE = "./rug.png";

// Define the URI of the image for the metadata (can be used later for linking the NFT)
const IMG_URI =
  "https://devnet.irys.xyz/7PwXAgBB6EH1FUBoktEGYdXQn2brD2hUYyxyMMDLGwB2";

// Async function to upload an image to Irys and get the URI
export async function uploadImage() {
  try {
    // Log the status of the image upload process
    console.log("🕣 Uploading image...");

    // Read the image file from the file system asynchronously
    const img = await readFile(IMAGE_FILE);

    // Convert the image into a generic file object, specifying its type as image/png
    const imgConverted = createGenericFile(new Uint8Array(img), "image/png");

    // Upload the image to Irys and get the URI of the uploaded image
    const [myUri] = await umi.uploader.upload([imgConverted]);

    // Log the URI of the uploaded image to the console
    console.log("✅ Done with URI:", myUri);
  } catch (err) {
    // Log any error that occurs during the image upload process
    console.error("[uploadImage] Failed with error:", err);
  }
}

// Call the uploadImage function to upload the image
uploadImage();
