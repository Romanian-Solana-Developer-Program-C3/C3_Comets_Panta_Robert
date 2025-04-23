use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Unstake {}

impl<'info> Unstake {
    pub fn unstake(&mut self) -> Result<()> {
        Ok(())
    }
}