use anchor_lang::error_code;

#[error_code]
pub enum LotteryError {
    #[msg("Ticket purchasing is only limited between start and end time")]
    InvalidTime,
}
