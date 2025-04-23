use anchor_lang::prelude::*;

use crate::state::{StakeUserConfig, StakeUserAccount};

#[derive(Accounts)]
pub struct Claim {}

impl<'info> Claim {
    pub fn claim(&mut self) -> Result<()> {
        Ok(())
    }
}