use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_2022::{transfer_checked, TransferChecked},
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::Offer;

/// Handler called when User B (Taker) accepts an offer made by User A (Maker).
/// Taker sends token B to the Maker and receives token A from the vault.
pub fn handler(ctx: Context<TakeOffer>, _id: u64) -> Result<()> {
    transfer_tokens_to_maker(&ctx)?;  // Transfer token B from Taker to Maker
    withdraw_from_vault(ctx)?;        // Transfer token A from vault to Taker
    Ok(())
}

/// Taker sends token B (which the Maker wants) to the Maker's token account.
pub fn transfer_tokens_to_maker(ctx: &Context<TakeOffer>) -> Result<()> {
    let offer = &ctx.accounts.offer;
    //Taker transfers token B to maker
    // Define the token transfer from taker to maker
    let transfer_accounts = TransferChecked {
        from: ctx.accounts.taker_token_account_b.to_account_info(),
        to: ctx.accounts.maker_token_account_b.to_account_info(),
        mint: ctx.accounts.token_mint_b.to_account_info(),
        authority: ctx.accounts.taker.to_account_info(),
    };
    
    // Create the CPI (Cross-Program Invocation) context
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(), 
        transfer_accounts,
    );

    // Execute transfer with checked decimals
    transfer_checked(
        cpi_context, 
        offer.token_b_wanted_amount, 
        ctx.accounts.token_mint_b.decimals,
    )
}

/// Transfer token A from the program's vault to the Taker.
pub fn withdraw_from_vault(ctx: Context<TakeOffer>) -> Result<()> {
    //Taker receives token A from vault(program)
    let signer_seeds: [&[&[u8]]; 1] = [&[
        b"offer".as_ref(),
        &ctx.accounts.maker.key().to_bytes(),
        &ctx.accounts.offer.id.to_le_bytes(),
        &[ctx.accounts.offer.bump],
    ]];

    // Define the transfer from vault to taker
    let accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        to: ctx.accounts.taker_token_account_a.to_account_info(),
        mint: ctx.accounts.token_mint_a.to_account_info(),
        authority: ctx.accounts.offer.to_account_info(),
    };

    // Create CPI context with signer
    let cpi_context = 
    CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(), 
        accounts,
        &signer_seeds,
    );
 
     // Transfer the offer's token A amount to the taker
    transfer_checked(
        cpi_context, 
        ctx.accounts.offer.token_a_amount, 
        ctx.accounts.token_mint_a.decimals,
    )?;

    Ok(())
}

/// All accounts needed to accept (take) an offer.

#[derive(Accounts)]

pub struct TakeOffer<'info>{
    #[account(mut)]
    pub taker: Signer<'info>,

    /// CHECK: This account is validated via `has_one = maker` in the `offer` account constraint
    pub maker: AccountInfo<'info>,

    #[account(mint::token_program = token_program)]
    pub token_mint_a: InterfaceAccount<'info, Mint>,
    #[account(mint::token_program = token_program)]
    pub token_mint_b: InterfaceAccount<'info, Mint>,

    // Account where the taker will receive token A
    #[account(init_if_needed,
        payer = taker,
        associated_token::mint = token_mint_a,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_token_account_a: InterfaceAccount<'info, TokenAccount>,

    // Taker's account holding token B to be sent to Maker
    #[account(mut,
        associated_token::mint = token_mint_b,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_token_account_b: InterfaceAccount<'info, TokenAccount>,

    // Maker's account to receive token B
    #[account(mut,
        associated_token::mint = token_mint_b,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
    )]
    pub maker_token_account_b: InterfaceAccount<'info, TokenAccount>,
    
    // Program-owned vault that holds token A until offer is taken
    #[account(
        mut,
        associated_token::mint = token_mint_a,
        associated_token::authority = offer,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    // The offer being taken
    #[account(
        has_one = maker,
        has_one = token_mint_a,
        has_one = token_mint_b,
        seeds = [b"offer".as_ref(), maker.key().as_ref(), offer.id.to_le_bytes().as_ref()],
        bump = offer.bump,
    )]
    pub offer: Account<'info, Offer>,

    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}