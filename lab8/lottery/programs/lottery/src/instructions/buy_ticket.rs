use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};

use crate::TokenLottery;

#[derive(Accounts)]

pub struct BuyTicket<'info> 
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub token_lottery: Account<'info, TokenLottery>,

    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

}

pub fn handler(ctx: Context<BuyTicket>, ticket_number: u64) -> Result<()> {
    let token_lottery = &mut ctx.accounts.token_lottery;

    token_lottery.tickets_num += 1;

    Ok(())
}