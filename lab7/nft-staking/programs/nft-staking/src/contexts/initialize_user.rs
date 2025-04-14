use anchor_lang::prelude::*;

use crate::state::StakeUserConfig;

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        seeds = [b"user".as_ref(), user.key().as_ref()],
        space = 8 + StakeUserConfig::INIT_SPACE,
        bump,
    )]
    pub user_config: Account<'info, StakeUserConfig>,

    pub system_program: Program<'info, System>,
    
    
}

impl<'info> InitializeUser<'info> {
    pub fn initialize_user(&mut self) -> Result<()> {
        self.user_config.set_inner(StakeUserConfig {
            points: 0,
            amount_staked: 0,
            bump: self.user_config.bump,
        });
        Ok(())
    }
}
