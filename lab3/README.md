# Laboratory 3
# Solana Transaction Scripts

This repository contains TypeScript scripts to interact with the Solana blockchain, including uploading NFT images, NFT metadata and creating NFTs.

## Commands

### 1. Upload NFT Image

Use this command to upload an image to be used for an NFT.

```bash
npx esrun nft-image.ts
```
This script uploads an image and returns a URI to access it.

### 2. Upload NFT Metadata

This command uploads metadata for an NFT, including name, symbol, description, and attributes.

```bash
npx esrun nft-metadata.ts
```

This script generates metadata in JSON format and uploads it to a decentralized storage service, returning a metadata URI.

### 3. Create NFT

This command mints a new NFT on the Solana blockchain using the uploaded metadata.

```bash
npx esrun nft-create.ts
```

This script initializes a new NFT mint, assigns metadata, and confirms the transaction on the blockchain.