use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeConfig{
    
}

pub fn handler(ctx: Context<InitializeConfig>) -> Result<()> {
    Ok(())
}
