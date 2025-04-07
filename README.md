#  ☄️C3 Comets Panța Robert☄️

This repository contains TypeScript, Rust and Anchor scripts to interact with the Solana blockchain from the **[Solana Developer Program](https://cometsweb3.space/solana-c3)**.

## Table of Contents 📑
1. [**Laboratory 1: Transactions**](#laboratory-1-)
2. [**Laboratory 2: Tokens**](#laboratory-2-)
3. [**Laboratory 3: NFTs**](#laboratory-3-)
4. [**Laboratory 4: RUST**](#laboratory-4-)
5. [**Laboratory 5: Anchor**](#laboratory-5-)
6. [**Laboratory 6 & 7: Escrow**](#laboratory-6--7-)
7. [**Laboratory 8: Lottery**](#laboratory-8-)


## Laboratory 1 🚀
### Solana Transaction Scripts
This section covers fundamental operations on the Solana blockchain, such as generating keypairs, checking balances, and sending SOL between accounts.

### Commands 🛠️
- **Generate Keypair** 🗝️
  ```sh
  npx tsx generate-keypair.ts
  ```
- **Check Balance** 💰
  ```sh
  npx esrun check-balance.ts <public-key>
  ```
- **Send SOL** 💸
  ```sh
  npx tsx transfer-sol.ts <recipient-public-key>
  ```

## Laboratory 2 🌟
### Solana Token Management
This section explores creating token mints, minting tokens, and transferring SPL tokens on Solana.

### Commands 🛠️
- **Create Token Mint** 🏦
  ```sh
  npx esrun create-token-mint.ts
  ```
- **Mint Tokens** 🏅
  ```sh
  npx esrun mint-tokens.ts
  ```
- **Transfer Tokens** 🔄
  ```sh
  npx esrun transfer-tokens.ts
  ```

## Laboratory 3 🎨
### NFT Creation on Solana
This section details uploading NFT images, metadata, and minting NFTs on Solana.

### Commands 🛠️
- **Upload NFT Image** 🖼️
  ```sh
  npx esrun nft-image.ts
  ```
- **Upload NFT Metadata** 📜
  ```sh
  npx esrun nft-metadata.ts
  ```
- **Create NFT** 🎟️
  ```sh
  npx esrun nft-create.ts
  ```

## Laboratory 4 🦀
### Rustlings Exercises
This section contains hands-on exercises designed to introduce to Rust's syntax and core concepts. It will work through a series of small programs that require debugging and modification to understand key Rust principles. 

### Structure of the Lab 🏗️

Rustlings exercises are divided into categories:

| Exercise   | Topic                   |
|:---------:|:-----------------------:|
| Exercise 0 | **Intro**               |
| Exercise 1 | **Variables**           |
| Exercise 2 | **Functions**           |
| Exercise 3 | **If Statements**       |
| Exercise 4 | **Primitive Types**     |
| Exercise 5 | **Vectors**             |
| Exercise 6 | **Move Semantics**      |
| Exercise 7 | **Structs**             |
| Exercise 8 | **Enums**               |
| Exercise 9 | **Strings**             |

## Laboratory 5 ⚓
### Building Solana Programs with Anchor
This section focuses on building Solana smart contracts (programs) using Anchor, a framework that simplifies the development of on-chain applications. The program demonstrates how to create, update, and manage personalized data on Solana using Anchor and Program Derived Addresses (PDAs), enabling developers to build decentralized applications that interact with on-chain data while maintaining high security and personalization.

### Commands 🛠️
- **Build the Program** 🚀
  ```sh
  anchor build
  ```

- **Run Unit Tests** 🧪
  ```sh
  anchor test  
  ```

### Solana Favorites Program Using Anchor 🌟
This Solana-based program allows users to store and manage their favorite color, favorite number, and hobbies on the blockchain. Built with the Anchor framework, the program ensures that each user's preferences are securely stored in an account, making the data immutable and easily accessible.

### Key Features 🔑
- **Secure User Data:** Only the account owner (the user) can modify their favorites, ensuring privacy and security.

- **Permanent Storage:** User preferences are stored on-chain, making the data accessible and unaltered over time.

- **Program Derived Addresses (PDAs):** The program uses PDAs to securely derive unique addresses for each user, ensuring that each user's data is associated with their public key. This ensures each user has their own personalized account, which is tied to their public key and cannot be modified by others.

- **Simple Interaction:** Users can easily set and retrieve their favorite color, number, and hobbies using smart contract methods.

## Laboratory 6 & 7 🏦
### Building Solana Escrow Program with Anchor

This section focuses on creating a Solana escrow program using the Anchor framework. The program allows users to create offers for token exchanges, securely depositing tokens into an escrow account, and facilitate the exchange of assets between parties. By leveraging Anchor’s tools and Solana's smart contract capabilities, the program ensures secure and efficient transactions while preventing fraud.

### Commands 🛠️
- **Build the Program** 🚀
  ```sh
  anchor build
  ```

- **Run Unit Tests** 🧪
  ```sh
  anchor test  
  ```

### Escrow Program Using Anchor 🌟
This Solana-based program allows users to create escrow offers for token swaps, securely holding the deposited tokens until both parties fulfill the terms of the offer. Built with the Anchor framework, the program ensures that assets are managed and exchanged in a trustless manner.

### Key Features 🔑
- **Secure Token Deposit:** Users deposit tokens into an escrow account, where they are held until the exchange conditions are met.

- **Trustless Transactions:** The program ensures that both parties involved in the offer must fulfill the terms before the tokens are released, reducing the risk of fraud.

- **Personalized Offers:** Users can create offers with specific token amounts and conditions, making each offer unique and customizable.

- **Program Derived Addresses (PDAs):** Each offer is linked to a unique address, derived from the user's public key, ensuring that offers are securely tied to the creator and cannot be modified by others.

- **Efficient Token Exchange:** The program facilitates the secure transfer of tokens between users, ensuring that the exchange process is seamless and efficient.

- **Cross Program Invocation (CPI):** The program uses CPI to call the transfer_checked function from the TokenProgram, enabling secure token transfers between accounts. This allows the escrow program to interact with other on-chain programs to manage token transfers, enhancing flexibility and security.

## Laboratory 8 🏦
### Lottery

