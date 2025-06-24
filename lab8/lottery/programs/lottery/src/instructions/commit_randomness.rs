use anchor_lang::prelude::*;
// use switchboard_on_demand::accounts::RandomnessAccountData;

// #[derive(Accounts)]
//  pub struct CommitRandomness<'info>{

    // pub token_lottery: Account<'info, TokenLottery>,
    // pub randomness_account_data: AccountInfo<'info>,
// }

// pub fn handler(ctx: Context<CommitRandomness>) -> Result<()> {

    // let randomness_data = RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data)?;

    // if randomness_data.seed_slot < clock.slot - 1 {
    //     return err!(LotteryError::RandomnessTooOld);
    // }

    // let token_lottery: &mut _ = &mut ctx.accounts.token_lottery;

    // token_lottery.randomness_account_data = randomness_data.key();

//     Ok(())
// }
