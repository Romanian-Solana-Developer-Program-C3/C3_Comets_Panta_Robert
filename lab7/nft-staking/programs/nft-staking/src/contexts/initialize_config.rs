use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeConfig<'info> {}

impl<'info> InitializeConfig<'info> {
    pub fn initialize_config(&mut self) -> Result<()> {
        Ok(())
    }
}
