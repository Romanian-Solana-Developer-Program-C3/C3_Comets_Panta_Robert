use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct PickWinner<'info>{
    randomness_account_data: AccountInfo<'info>,
}

pub fn handler(ctx: Context<PickWinner>) -> Result<()> {
    let clock = Clock::get()?;

    let randomness_data = RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data.borrow()).unwrap()?;

    let revealed_random_value = randomness_data
    .get_value(&clock)
    .map_err(|_| LotteryError::RandomnessNotResolved)?;

    Ok(())
}