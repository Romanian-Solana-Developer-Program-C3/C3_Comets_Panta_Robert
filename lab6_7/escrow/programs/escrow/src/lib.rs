pub mod constants;  // Module for constants used throughout the program
pub mod error;      // Module to handle custom error types
pub mod instructions;  // Module that contains logic for handling program instructions
pub mod state;      // Module for defining the program state

use anchor_lang::prelude::*;  // Importing necessary Anchor language utilities

// Re-export the contents of the modules so they are accessible in other parts of the program
pub use constants::*;  
pub use instructions::*;  
pub use state::*;

// Declare the unique program ID used for identifying the smart contract on the Solana blockchain
declare_id!("EzKx1u3MTR1SmpEuLL3dTrxyyDj4nPqcu4ThbeoZvbd3");

#[program]
pub mod escrow {  // Main module for the Escrow program
    use super::*;  // Bring in items from the other modules for use in this module

    // Handler for creating a new offer, which includes the offer details and token transfers
    pub fn make_offer(
        ctx: Context<MakeOffer>,  // Context includes accounts involved in the offer
        id: u64,  // Offer ID
        token_a_amount: u64,  // Amount of token A in the offer
        token_b_wanted_amount: u64  // Amount of token B the user wants in return
    ) -> Result<()> {
        // Call the handler function from the make_offer module to handle the offer creation
        make_offer::handler(ctx, id, token_a_amount, token_b_wanted_amount)
    }

    // Handler for taking an offer, where a user accepts an existing offer
    pub fn take_offer(
        ctx: Context<TakeOffer>,  // Context includes accounts involved in the offer taking
        id: u64  // Offer ID to be taken
    ) -> Result<()> {
        // Call the handler function from the take_offer module to process the offer acceptance
        take_offer::handler(ctx, id)?;

        Ok(())
    }
}
