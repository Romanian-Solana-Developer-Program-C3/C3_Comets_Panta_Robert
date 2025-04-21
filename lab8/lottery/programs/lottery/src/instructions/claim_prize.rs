use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct ClaimPrize{}

pub fn handler(ctx: Context<ClaimPrize>) -> Result<()> {
    Ok(())
}