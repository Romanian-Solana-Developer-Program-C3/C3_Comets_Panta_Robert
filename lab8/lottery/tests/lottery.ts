import * as anchor from "@coral-xyz/anchor";
import { BN, Program } from "@coral-xyz/anchor";
import { Lottery } from "../target/types/lottery";
import { makeKeypairs } from "@solana-developers/helpers";
import { createMint, getAssociatedTokenAddressSync, MINT_SIZE} from "@solana/spl-token";
import { SystemProgram} from "@solana/web3.js";



describe("lottery", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Lottery as Program<Lottery>;
  const [alice, tokenMint] = makeKeypairs(2);
  

  const aliceTokenAccount = getAssociatedTokenAddressSync(
    tokenMint.publicKey,
    alice.publicKey,
    true,
    program.programId
  );


//Initialize Mint
//Initialize user token account
//Mint tokens to alice token account
//Initialize lottery
//Buy ticket

  it("Is config initialized!", async () => {
    // Add your test here.

    let minimumLamports = await provider.connection.getMinimumBalanceForRentExemption(MINT_SIZE);

    const tokenMintInstructions = SystemProgram.createAccount({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: tokenMint.publicKey,
      space: MINT_SIZE,
      lamports: minimumLamports,
      programId: program.programId,
    });

    const tokenMintInstructions2 = createMint(
      provider.connection,
      wallet.payer,
      tokenMint.publicKey,
      wallet.publicKey,
      6
    );


    const slot = await provider.connection.getSlot();


    const tx = await program.methods
    .initializeConfig(new BN(0), new BN(slot +10), new BN(100))
    .accounts({
      admin: wallet.publicKey,
    })
    .rpc();
    console.log("Your transaction signature", tx);

  });
});
