use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{transfer_checked, Token, TransferChecked},
    token_interface::{Mint, TokenAccount,TokenInterface},
};

use crate::Offer;

/// Handler for creating a new offer by User A (Maker)
/// - Initializes the offer and moves token A into the vault (escrow)

pub fn handler(
    ctx: Context<MakeOffer>, 
    id: u64,
    token_a_amount: u64,
    token_b_wanted_amount: u64,
) -> Result<()>{

    // Populate the Offer struct with provided data
    // Offer contains details like the maker's address, token amounts, and associated mints
   
    ctx.accounts.offer.set_inner(Offer{
        id,
        maker:ctx.accounts.maker.key(),
        token_a_amount,
        token_mint_a: ctx.accounts.token_mint_a.key(),
        token_b_wanted_amount,
        token_mint_b: ctx.accounts.token_mint_b.key(),
        bump:ctx.bumps.offer,
    });

    // Move Maker's token A into the program's vault (escrow)
    // The vault will temporarily hold token A while waiting for the offer to be taken
    send_offer_tokens_to_vault(ctx, token_a_amount)?;

    Ok(())
}

/// Transfer token A from the Maker to the program's vault account.
/// - Maker is the source of token A and the vault is the destination.
pub fn send_offer_tokens_to_vault(
    ctx: Context<MakeOffer>,
    token_a_amount: u64,

) -> Result<()> {
    // Set up the transfer details for token A from Maker's account to the vault
    let transfer_accounts = TransferChecked{
        from: ctx.accounts.maker_token_account_a.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.token_mint_a.to_account_info(),
        authority: ctx.accounts.maker.to_account_info(),
    };
    
    // Create the CPI (Cross-Program Invocation) context to invoke the transfer_checked function
    let cpi_context = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
         transfer_accounts,
    );

    // Execute the token transfer, using the specified amount and mint decimals for token A
    transfer_checked(
        cpi_context, 
        token_a_amount,
        ctx.accounts.token_mint_a.decimals,
    )
    
}

//UserA -- deposits token A into our program -> wants token B from our program
//UserA -- creates an offer
#[derive(Accounts)]
#[instruction(id: u64)]

pub struct MakeOffer<'info>{
    #[account(mut)]
    pub maker: Signer<'info>,

    #[account(mint::token_program = token_program)]
    pub token_mint_a: InterfaceAccount<'info, Mint>,
    #[account(mint::token_program = token_program)]
    pub token_mint_b: InterfaceAccount<'info, Mint>,

    // Maker's account from which token A will be sent to the vault
    #[account(
        mut,
        associated_token::mint = token_mint_a,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
    )]

    // Vault account (escrow) owned by the program for holding token A
    pub maker_token_account_a: InterfaceAccount<'info, TokenAccount>,
    #[account(init, 
        payer = maker,
        associated_token::mint = token_mint_a,
        associated_token::authority = offer,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    // Account storing the offer's data (PDA)
    #[account(init,
        payer = maker,
        seeds = [b"offer".as_ref(), maker.key().as_ref(), id.to_le_bytes().as_ref()],
        space = 8 + Offer::INIT_SPACE,
        bump,
    )]
    pub offer: Account<'info, Offer>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

