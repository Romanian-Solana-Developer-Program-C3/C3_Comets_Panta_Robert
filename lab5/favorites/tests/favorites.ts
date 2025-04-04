import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Favorites as Program<Favorites>;

  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods.initialize().rpc();
  //   console.log("Your transaction signature", tx);
  // });

  it("Save a user's favorite", async () => {
    const favoritesPdaAndBump = await publicKey.findProgramAddress(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );

    const favoritesPda = favoritesPdaAndBump[0];

    const pdaState = await program.account.favorites.fetch(favoritesPda);

  })

});
