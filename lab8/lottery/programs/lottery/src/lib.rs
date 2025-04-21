pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;



declare_id!("mr3HyoZL1oEKhyKoaX9RH1M5EDhsJ2q6zWeh6Ei1e4C");

#[program]
pub mod lottery {
    use super::*; 

    pub fn initialize_config(
        ctx: Context<InitializeConfig>, 
        start_time: u64, 
        end_time: u64, 
        ticket_price: u64, 
        token_mint: Pubkey,
    ) -> Result<()> {
        instructions::initialize_config::handler(
            ctx, 
            start_time, 
            end_time, 
            ticket_price)
    }

    pub fn initialize_lottery(ctx: Context<InitializeLottery>) -> Result<()> {
        instructions::initialize_lottery::handler(ctx)
    }

    pub fn buy_ticket(ctx: Context<BuyTicket>) -> Result<()> {
        instructions::buy_ticket::handler(ctx)
    }

    // pub fn commit_randomness(ctx: Context<CommitRandomness>) -> Result<()> {
    //     instructions::commit_randomness::handler(ctx)
    // }

    pub fn pick_winner(ctx: Context<PickWinner>) -> Result<()> {
        instructions::pick_winner::handler(ctx)
    }

    pub fn claim_prize(ctx: Context<ClaimPrize>) -> Result<()> {
        instructions::claim_prize::handler(ctx)
    }

}
