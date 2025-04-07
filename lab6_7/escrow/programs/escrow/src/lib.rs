pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("EzKx1u3MTR1SmpEuLL3dTrxyyDj4nPqcu4ThbeoZvbd3");

#[program]
pub mod escrow {
    use super::*;

    pub fn handler(ctx:Context<MakeOffer>,
         id: u64, 
         token_a_amount: u64, 
         token_b_wanted_amount: u64
    ) -> Result<()>{
        make_offer::handler(ctx, id, token_a_amount, token_b_wanted_amount)
    }

    pub fn take_offer(
        ctx: Context<TakeOffer>, 
        id: u64
    ) -> Result<()> {
        take_offer::handler(ctx, id)?;

        Ok(())
    }
}
