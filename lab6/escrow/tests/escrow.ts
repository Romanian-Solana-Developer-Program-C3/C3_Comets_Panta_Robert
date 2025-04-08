import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Escrow } from "../target/types/escrow";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { assert } from "chai";

describe("escrow test", () => {
  // Setting up the provider for Anchor and the program.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Escrow as Program<Escrow>;
  const payer = provider.wallet as anchor.Wallet;

  // Creating key pairs for the maker and the taker.
  const maker = Keypair.generate();
  const taker = Keypair.generate();

  // Declaring variables for token mints, token accounts, and program-derived addresses (PDA).
  let tokenMintA: PublicKey;
  let tokenMintB: PublicKey;
  let makerTokenAccountA: PublicKey;
  let makerTokenAccountB: PublicKey;
  let takerTokenAccountA: PublicKey;
  let takerTokenAccountB: PublicKey;
  let offerPda: PublicKey;
  let vault: PublicKey;

  // Test data for the offer: offer ID, amount of tokens A and B.
  const id = new anchor.BN(1234);
  const tokenAAmount = new anchor.BN(100);
  const tokenBAmount = new anchor.BN(200);

  before(async () => {
    // Airdrop Solana tokens to both maker and taker to cover transaction fees.
    await provider.connection.requestAirdrop(maker.publicKey, 1e9);
    await provider.connection.requestAirdrop(taker.publicKey, 1e9);
    await new Promise((res) => setTimeout(res, 1000)); // Wait for a second to ensure airdrop completion.

    // Create token mints for token A and token B.
    tokenMintA = await createMint(
      provider.connection,
      payer.payer,
      payer.publicKey,
      null,
      6
    );
    tokenMintB = await createMint(
      provider.connection,
      payer.payer,
      payer.publicKey,
      null,
      6
    );

    // Create associated token accounts for both maker and taker for each token mint.
    makerTokenAccountA = (
      await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer.payer,
        tokenMintA,
        maker.publicKey
      )
    ).address;

    makerTokenAccountB = (
      await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer.payer,
        tokenMintB,
        maker.publicKey
      )
    ).address;

    takerTokenAccountA = (
      await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer.payer,
        tokenMintA,
        taker.publicKey
      )
    ).address;

    takerTokenAccountB = (
      await getOrCreateAssociatedTokenAccount(
        provider.connection,
        payer.payer,
        tokenMintB,
        taker.publicKey
      )
    ).address;

    // Mint tokens to the accounts for testing.
    await mintTo(provider.connection, payer.payer, tokenMintA, makerTokenAccountA, payer.payer, 1_000);
    await mintTo(provider.connection, payer.payer, tokenMintB, takerTokenAccountB, payer.payer, 1_000);

    // Calculate the PDA for the offer based on the maker's public key and the offer ID.
    [offerPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("offer"), maker.publicKey.toBuffer(), id.toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    // Find the associated token address (vault) for the offer.
    vault = await anchor.utils.token.associatedAddress({
      mint: tokenMintA,
      owner: offerPda,
    });
  });

  it("creates an offer", async () => {
    // Test for creating an offer.
    await program.methods
      .makeOffer(id, tokenAAmount, tokenBAmount)
      .accountsStrict({
        maker: maker.publicKey,
        tokenMintA,
        tokenMintB,
        makerTokenAccountA,
        vault,
        offer: offerPda,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([maker])
      .rpc();

    // Fetch the offer to ensure it was created correctly.
    const offer = await program.account.offer.fetch(offerPda);
    // Validate the offer's token amounts.
    assert.equal(offer.tokenAAmount.toNumber(), tokenAAmount.toNumber());
    assert.equal(offer.tokenBWantedAmount.toNumber(), tokenBAmount.toNumber());
  });

  it("takes the offer", async () => {
    // Test for taking the offer.
    await program.methods
      .takeOffer(id)
      .accountsStrict({
        taker: taker.publicKey,
        maker: maker.publicKey,
        tokenMintA,
        tokenMintB,
        takerTokenAccountA,
        takerTokenAccountB,
        makerTokenAccountB,
        vault,
        offer: offerPda,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([taker])
      .rpc();

    // If the offer is successfully taken, the test will pass without throwing an error.
    assert.ok(true);
  });
});

