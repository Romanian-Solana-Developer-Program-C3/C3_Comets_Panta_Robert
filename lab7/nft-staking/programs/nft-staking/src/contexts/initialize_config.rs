use anchor_lang::prelude::*;

use anchor_spl::token::{Mint, Token};

use crate::state::config::StakingConfig;

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        seeds = [b"config".as_ref()],
        bump,
        space = 8 + StakeConfig::INIT_SPACE
    )]
    pub config: Account<'info, StakingConfig>,

    #[account(
        init,
        payer = admin,
        seeds = [b"rewards".as_ref(), config.key().as_ref()],
        bump,
        mint::decimals = 6,
        mint::authority = config
    )]
    pub rewards_mint: Account<'info, Mint>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, Token>,
}

impl<'info> InitializeConfig<'info> {
    pub fn initialize_config(&mut self) -> Result<()> {
        Ok(())
    }
}
