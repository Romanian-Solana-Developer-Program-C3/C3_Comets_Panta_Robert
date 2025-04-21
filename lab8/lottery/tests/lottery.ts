import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Lottery } from "../target/types/lottery";

describe("lottery", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Lottery as Program<Lottery>;

  it("Is config initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initializeConfig(new BN(0), new BN(10000), new BN(100))
    .accounts({
      admin: wallet.publicKey,
      tokenLottery: tokenLottery.publicKey,
    })
    console.log("Your transaction signature", tx);

  });
});
