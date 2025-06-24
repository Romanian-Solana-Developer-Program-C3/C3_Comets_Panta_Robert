use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount, Token},
};

pub fn handler(
    ctx: Context<InitializeConfig>, 
    start_time: u64, 
    end_time: u64, 
    ticket_price: u64,
) -> Result<()> {
    let token_lottery = &mut ctx.accounts.token_lottery;


    msg!("Start time: {}", start_time);
    msg!("End time: {}", end_time);
    msg!("Ticket price: {}", ticket_price);


    token_lottery.set_inner(TokenLottery {
        admin: ctx.accounts.admin.key(),
        winner_chosen: false,
        bump: ctx.bumps.token_lottery,
        padding: [0; 6],
        ticket_price,
        reward_amount: 0,
        tickets_num: 0,
        start_time,
        end_time,
        randomness_account: Pubkey::default(),
    });
    Ok(())
}


#[derive(Accounts)]
#[instruction(token_mint: Pubkey)]

pub struct InitializeConfig<'info>{
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(init,
        payer = admin,
        space = 8 + TokenLottery::INIT_SPACE,
        seeds = [b"token_lottery", token_mint.key().as_ref()],
        bump,
    )]
    pub token_lottery: Account<'info, TokenLottery>,

    #[account(init,
        payer = admin,
        associated_token::mint = token_mint,
        associated_token::authority = token_lottery,
    )]
    pub token_lottery_vault: Account<'info, TokenAccount>,

    pub token_mint: Account<'info, Mint>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,

}


#[account]
#[derive(InitSpace)]
pub struct TokenLottery {
    pub admin: Pubkey,
    pub winner_chosen: bool,
    pub bump: u8,
    pub padding: [u8; 6],
    pub ticket_price: u64,
    pub reward_amount: u64,
    pub tickets_num: u64,
    pub start_time: u64,
    pub end_time: u64,
    pub randomness_account: Pubkey,
}

// pub const TOKEN_LOTTERY_INITSPACE: usize = 8 + 80