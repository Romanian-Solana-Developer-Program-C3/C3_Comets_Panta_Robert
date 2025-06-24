use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct StakeUserConfig {
    pub points: u32,
    pub amount_staked: i64,
    pub bump: u8,
}
