use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeLottery{}

pub fn handler(ctx: Context<InitializeLottery>) -> Result<()> {
    Ok(())
}