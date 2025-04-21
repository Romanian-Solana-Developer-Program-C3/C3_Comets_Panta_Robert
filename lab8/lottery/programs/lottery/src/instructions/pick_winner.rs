use anchor_lang::prelude::*;
use crate::TokenLottery;

#[derive(Accounts)]
pub struct PickWinner<'info>{
    pub token_lottery: Account<'info, TokenLottery>,
    pub randomness_account_data: AccountInfo<'info>,
}

pub fn handler(ctx: Context<PickWinner>) -> Result<()> {
    let clock = Clock::get()?;

    // let randomness_data = RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data.borrow()).unwrap()?;

    // let revealed_random_value = randomness_data
    // .get_value(&clock)
    // .map_err(|_| LotteryError::RandomnessNotResolved)?;

    // let num_of_tickets = &mut ctx.accounts.token_lottery.tickets_num;
    // let winner_ticket = revealed_random_value(0) % num_of_tickets;

    Ok(())
}