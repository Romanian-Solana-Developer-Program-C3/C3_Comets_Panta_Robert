use anchor_lang::prelude::*;

use crate::state::{StakeUserConfig, StakeUserAccount};

#[derive(Accounts)]
pub struct Claim<'info> {}

impl<'info> Claim<'info> {
    pub fn claim(&mut self) -> Result<()> {
        Ok(())
    }
}