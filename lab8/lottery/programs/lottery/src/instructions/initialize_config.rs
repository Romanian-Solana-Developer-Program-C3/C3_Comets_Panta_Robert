use anchor_lang::prelude::*;

#[derive(Accounts)]

pub struct InitializeConfig<'info>{
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        space = 8 + TokenLottery::INITSPACE,
        seeds = [b"token_lottery".as_ref(), admin.key().as_ref()],
        bump,
    )]
    pub token_lottery: Account<'info, TokenLottery>,


    pub system_program: Program<'info, System>,

}

pub fn handler(ctx: Context<InitializeConfig>) -> Result<()> {
    Ok(())
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
    pub tickets_number: u64,
    pub start_time: u64,
    pub end_time: u64,
    
}

// pub const TOKEN_LOTTERY_INITSPACE: usize = 8 + 80