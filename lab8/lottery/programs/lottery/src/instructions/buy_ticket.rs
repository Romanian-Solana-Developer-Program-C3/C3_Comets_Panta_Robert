use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, Transfer, TokenAccount};

use crate::{error::LotteryError, TokenLottery};

#[derive(Accounts)]

pub struct BuyTicket<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut,
        seeds = [b"token_lottery", token_mint.key().as_ref()],
        bump =token_lottery.bump,
    )]
    pub token_lottery: Account<'info, TokenLottery>,

    #[account(mut,
        associated_token::mint = token_mint,
        associated_token::authority = token_lottery,
    )]

    pub token_lottery_vault: Account<'info, TokenAccount>,

    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,

}

pub fn handler(ctx: Context<BuyTicket>) -> Result<()> {
    let token_lottery = &mut ctx.accounts.token_lottery;

    let clock = Clock::get()?;

    if clock.slot < token_lottery.start_time || clock.slot > token_lottery.end_time {
        return err!(LotteryError::InvalidTime);
    }

    token_lottery.tickets_num += 1;

    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(), 
        Transfer {
            from: ctx.accounts.user_token_account.to_account_info(),
            to: ctx.accounts.token_lottery_vault.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        }
    );

    token::transfer(cpi_ctx, token_lottery.ticket_price)?;
    
    

    Ok(())
}