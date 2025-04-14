use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeUser<'info> {}

impl<'info> InitializeUser<'info> {
    pub fn initialize_user(&mut self) -> Result<()> {
        Ok(())
    }
}
