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

    pub fn handler(ctx:Context<MakeOffer>) -> Result<()>{
        make_offer::handler(ctx)
    }
}

// pub fn make_offr()

// pub fn take_offer()
