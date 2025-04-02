use anchor_lang::prelude::*;

declare_id!("FmK17VySbNkECs1AqdLZ1FrBG7QbnRk3PVPn6S3kpNej");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
