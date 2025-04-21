use anchor_lang::prelude::*;

pub fn handler(
    ctx: Context<InitializeConfig>, 
    start_time: u64, 
    end_time: u64, 
    ticket_price: u64, 
    reward_amount: u64,
    tickets_number: u64
) -> Result<()> {
    let token_lottery = &mut ctx.accounts.token_lottery;
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
    });
    Ok(())
}


#[derive(Accounts)]

pub struct InitializeConfig<'info>{
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(init,
        space = 8 + TokenLottery::INITSPACE,
        seeds = [b"token_lottery".as_ref()],
        bump,
    )]
    pub token_lottery: Account<'info, TokenLottery>,


    pub system_program: Program<'info, System>,

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