use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Stake<'info> {}

impl<'info> Stake<'info> {
    pub fn stake(&mut self) -> Result<()> {
        Ok(())
    }
}
