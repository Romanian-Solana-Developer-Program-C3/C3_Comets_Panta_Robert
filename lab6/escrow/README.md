# Laboratory 6 🧑‍💻
# Escrow Scripts

This section contains Anchor-based scripts used to develop and deploy a Solana escrow program, allowing token exchange between parties with secure conditions.

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
anchor init escrow --template=multiple
cd escrow
anchor test 
```

### 3. Build & Test 🛠️
Building the Project:
```bash
anchor build
```
💡 The IDL file (Interface Definition Language) can be found under target/idl/escrow.json.

Testing the Project:
```bash
anchor test 
```

Results of the tests are successfully:
<p align="center">
  <img src="lab6_7_tests.png" alt="Results: Tests" width="800">
  <br>
  <em>Results: Tests</em>
</p>

