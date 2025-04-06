use anchor_lang::prelude::*;

#[account]

pub struct Offer{
    pub id: u64,
    pub maker: Pubkey,

    pub token_a_amount: u64,
    pub token_a_mint: Pubkey, 

    pub token_b_wanted_amount: u64,
    pub token_b_mint: Pubkey, 
}