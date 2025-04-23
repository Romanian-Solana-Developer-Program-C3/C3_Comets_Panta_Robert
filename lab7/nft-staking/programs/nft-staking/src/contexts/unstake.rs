use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Unstake<'info> {}

impl<'info> Unstake<'info> {
    pub fn unstake(&mut self) -> Result<()> {
        Ok(())
    }
}