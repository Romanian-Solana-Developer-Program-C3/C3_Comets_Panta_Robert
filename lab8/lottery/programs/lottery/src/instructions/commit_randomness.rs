use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CommitRandomness{}

pub fn handler(ctx: Context<CommitRandomness>) -> Result<()> {
    Ok(())
}
