use anchor_lang::prelude::*;

pub mod contexts;
pub use contexts::*;

pub mod state;
pub use state::*;

declare_id!("BipXcuvN1ydvxUMXtW2NCQCRimeno4W8U9wjxtTExF2K");

#[program]
pub mod nft_staking {

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_config()
    }

    pub fn initialize_user(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.initialize_user()
    }

    pub fn stake(ctx: Context<Stake>) -> Result<()> {
        ctx.accounts.stake()
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        ctx.accounts.unstake()
    }

    pub fn claim(ctx: Context<Claim>) -> Result<()> {
        ctx.accounts.claim()
    }
       
}

