# Laboratory 6 & 7
# Escrow Scripts

This repository contains Anchor scripts used for the development and deployment of Solana smart contracts (programs).

## Getting Started

### 1. Prerequisites
Ensure having the following installed:

**Solana CLI release** 
```bash
solana-install init 1.18.25 
```

**Rust 1.76** 
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh 
```

**Anchor 0.30.1** 
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force 

avm install 0.30.1 
avm use 0.30.1 
```

### 2. Running the Exercises
Start the Anchor framework using:
```bash
anchor init escrow --template=multiple
cd escrow
anchor test 
```

### 3. Build & Test
Building the Project:
```bash
anchor build
```
see idl-> favorites.json

Testing the Project:
```bash
anchor test 
```



