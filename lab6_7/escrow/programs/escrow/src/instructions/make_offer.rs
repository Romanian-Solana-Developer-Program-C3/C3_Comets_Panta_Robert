use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::TokenAccount,
    token_interface::{Mint, TokenInterface},
};
//UserA -- deposits token A into our program -> wants token B from our program
//UserA -- creates an offer
#[derive(Accounts)]

pub struct MakeOffer<'info>{
    #[account(mut)]
    pub maker: Signer<'info>,

    pub token_mint_a: InterfaceAccount<'info, Mint>,
    pub token_mint_b: InterfaceAccount<'info, Mint>,

    pub maker_token_account_a: Account<'info, TokenAccount>,
    #[account(init, 
        payer = maker,
        associated_token::mint = token_mint_a,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
        
    )]
    pub vault: Account<'info, TokenAccount>,
    // #[account(init,
    //     payer = maker,
    //     seeds = [b"offer", as_ref()],
    //     space = ,
    //     bump             
    // )]

    // pub offer: Account<'info, Offer>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx:Context<MakeOffer>) -> Result<()>{
    Ok({})
}