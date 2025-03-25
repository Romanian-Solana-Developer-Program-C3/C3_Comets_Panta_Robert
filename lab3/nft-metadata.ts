import "dotenv/config";

import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

const kp = getKeypairFromEnvironment("SECRET_KEY");

const umi = createUmi(clusterApiUrl("devnet"));

const keypair = umi.eddsa.createKeypairFromSecretKey(kp.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMG_URI =
  "https://devnet.irys.xyz/7PwXAgBB6EH1FUBoktEGYdXQn2brD2hUYyxyMMDLGwB2";

const METADATA_URI =
  "https://devnet.irys.xyz/2eXS7i2a8ZQvBrsLjx4bTVy4E97kHo83Qck8yGHKNX2r";

async function uploadMetadata() {
  try {
    const metadata = {
      name: "Comets RUG",
      symbol: "CRUG",
      desciption: "This is a Stellar RUG",
      image: IMG_URI,
      attributes: [
        { trait_type: "Color", value: "red" },
        { trait_type: "Material", value: "wool" },
        { trait_type: "Size", value: "very big" },
      ],
      properties: {
        files: [{ type: "image/png", uri: IMG_URI }],
      },
    };

    const metadataUri = await umi.uploader.uploadJson(metadata);

    console.log("✅ Done with metadata URI:", metadataUri);
  } catch (error) {
    console.error("[uploadMetadata] Failed with:", error);
  }
}

uploadMetadata();