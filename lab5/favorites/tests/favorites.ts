import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";

const web3 = anchor.web3;

describe("favorites", () => {
  // Use the cluster and the keypair specified in Anchor.toml 
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  // You can skip this 'before' section if you're busy! 
  // We don't need to airdrop if we're using the local cluster 
  // because the local cluster gives us 85 billion dollars worth of SOL 

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;
    console.log(`Balance: ${balanceInSOL.toFixed(2)} SOL`);
  });

  it("Saves a user's favorites to the blockchain", async () => {
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "purple";
    const favoriteHobbies = ["skiing", "skydiving", "biking"];

    await program.methods
      .setFavorites(favoriteColor, favoriteNumber, favoriteHobbies)
      .signers([user])
      .rpc();

    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync( 
      [Buffer.from("favorites"), user.publicKey.toBuffer()], 
      program.programId 
    );

    const favoritesPda = favoritesPdaAndBump[0]; 
    const dataFromPda = await program.account.favorites.fetch(favoritesPda); 
    assert.equal(dataFromPda.color, favoriteColor);
    assert.equal(dataFromPda.number.toString(), favoriteNumber.toString());
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
  });

  it("Doesn't let people write to favorites for other users", async () => {
    const randomUser = anchor.web3.Keypair.generate();

    try {
      await program.methods
        .setFavorites("red", new anchor.BN(420), ["being a dork"])
        .signers([randomUser])
        .rpc();

      // If the above method succeeds, the test should fail
      assert.fail("Expected error, but the transaction succeeded");
    } catch (error) {
      const errorMessage = (error as Error).message;
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });
});





// 
// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Favorites } from "../target/types/favorites";
// import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
// import {assert}  from "chai";
// const web3 = anchor.web3;

// describe("favorites", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Favorites as Program<Favorites>;

//   // it("Is initialized!", async () => {
//   //   // Add your test here.
//   //   const tx = await program.methods.initialize().rpc();
//   //   console.log("Your transaction signature", tx);
//   // });

//   it("Save a user's favorite", async () => {
//     const favoritesPdaAndBump = await publicKey.findProgramAddress(
//       [Buffer.from("favorites"), user.publicKey.toBuffer()],
//       program.programId
//     );

//     const favoritesPda = favoritesPdaAndBump[0];

//     const pdaState = await program.account.favorites.fetch(favoritesPda);

//   })

// });
