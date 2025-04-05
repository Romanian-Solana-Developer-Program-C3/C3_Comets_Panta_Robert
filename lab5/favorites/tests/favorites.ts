import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";

const web3 = anchor.web3;

describe("favorites", () => {
  // Use the cluster and the keypair specified in Anchor.toml 
  const provider = anchor.AnchorProvider.env();  // Setting up the provider to use the environment's settings
  anchor.setProvider(provider);  // Set the provider for the program

  const user = (provider.wallet as anchor.Wallet).payer;  // Get the wallet (payer) for the user
  const program = anchor.workspace.Favorites as Program<Favorites>;  // Access the Favorites program

  // The 'before' section is run before the test cases to check the user's balance
  before(async () => {
    // Get the user's SOL balance
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSOL = balance / web3.LAMPORTS_PER_SOL;  // Convert the balance to SOL
    console.log(`Balance: ${balanceInSOL.toFixed(2)} SOL`);  // Print the balance to the console
  });

  // Test case to check saving a user's favorites to the blockchain
  it("Saves a user's favorites to the blockchain", async () => {
    const favoriteNumber = new anchor.BN(23);  // Define the favorite number
    const favoriteColor = "purple";  // Define the favorite color
    const favoriteHobbies = ["skiing", "skydiving", "biking"];  // Define the favorite hobbies

    // Call the setFavorites method of the program and send the transaction
    await program.methods
      .setFavorites(favoriteColor, favoriteNumber, favoriteHobbies)
      .signers([user])  // Sign the transaction with the user's wallet
      .rpc();  // Send the transaction to the blockchain

    // Calculate the Program Derived Address (PDA) for the user's favorites
    const favoritesPdaAndBump = web3.PublicKey.findProgramAddressSync( 
      [Buffer.from("favorites"), user.publicKey.toBuffer()], 
      program.programId 
    );

    const favoritesPda = favoritesPdaAndBump[0];  // Extract the PDA from the result
    // Fetch the data stored at the PDA
    const dataFromPda = await program.account.favorites.fetch(favoritesPda); 
    // Assert that the saved data matches the input values
    assert.equal(dataFromPda.color, favoriteColor);
    assert.equal(dataFromPda.number.toString(), favoriteNumber.toString());
    assert.deepEqual(dataFromPda.hobbies, favoriteHobbies);
  });

  // Test case to ensure that only the correct user can write to their favorites
  it("Doesn't let people write to favorites for other users", async () => {
    const randomUser = anchor.web3.Keypair.generate();  // Generate a random user's keypair

    try {
      // Try to set favorites for the random user
      await program.methods
        .setFavorites("red", new anchor.BN(420), ["being a dork"])
        .signers([randomUser])  // Sign the transaction with the random user
        .rpc();  // Send the transaction to the blockchain

      // If the above method succeeds, the test should fail since this is not allowed
      assert.fail("Expected error, but the transaction succeeded");
    } catch (error) {
      const errorMessage = (error as Error).message;  // Get the error message from the thrown error
      // Assert that the error contains the message "unknown signer" which means the user isn't allowed to modify another user's favorites
      assert.isTrue(errorMessage.includes("unknown signer"));
    }
  });
});
