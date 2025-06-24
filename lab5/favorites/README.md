# Laboratory 5 🧑‍💻
# Anchor Scripts

This repository contains Anchor scripts used for the development and deployment of Solana smart contracts (programs).

## Getting Started 🚀

### 1. Prerequisites ✅
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

**Yarn**
```bash
npm i -g yarn

```

### 2. Running the Exercises ⚙️
Start the Anchor framework using:
```bash
anchor init favorites 
cd favorites 
yarn i 
anchor test 
```

### 3. Build & Test 🛠️
Building the Project:
```bash
anchor build
```
💡 The IDL file (Interface Definition Language) can be found under target/idl/favorites.json.

Testing the Project:
```bash
anchor test 
```

Results of the tests are successfully:
<p align="center">
  <img src="lab5_tests.png" alt="Results: Tests" width="800">
  <br>
  <em>Results: Tests</em>
</p>


## Q&A 💬

| Questions   | Answers                  |
|:---------:|:-----------------------:|
| 1. Does the anchor project compile without any warnings?  | **No, the Anchor project does not compile without warnings. The output shows several warnings related to unexpected cfg condition values (such as custom-heap, solana, anchor-debug, etc.), which are caused by configuration mismatches or outdated dependencies.**               |
| 2. What is the name of the instruction handler?  | **In an Anchor program, the instruction handler is typically the function marked with the #[instruction] attribute or defined as part of the #[program] macro. For the project structure, the instruction handler is in the lib.rs file under favorites/programs/src/ directory; therefore, initialize is the instruction handler.**           |
| 3. The program has an ID, which is a pubkey. Where does the secret key for this pubkey exist? Hint: it's in your project. | **The secret key for this program ID (the private key corresponding to the public key) is stored in a specific file in the project, more exactly in the /target/deploy directory.**           |
