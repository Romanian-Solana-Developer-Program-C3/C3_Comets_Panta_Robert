use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Offer {
    pub id: u64,                   // Unique ID for the offer
    pub maker: Pubkey,             // Public key of the offer creator (User A)

    pub token_a_amount: u64,       // Amount of token A being offered
    pub token_mint_a: Pubkey,      // Mint address of token A

    pub token_b_wanted_amount: u64,// Amount of token B desired in exchange
    pub token_mint_b: Pubkey,      // Mint address of token B

    pub bump: u8,                  // Bump seed for the PDA
}
