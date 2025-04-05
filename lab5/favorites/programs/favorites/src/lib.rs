use anchor_lang::prelude::*;

// Declaring the program's address on the blockchain
declare_id!("FmK17VySbNkECs1AqdLZ1FrBG7QbnRk3PVPn6S3kpNej"); // Program address on the blockchain

// The program module where the functions are declared
#[program]
pub mod favorites {
    use super::*;

    // The initialize function sets up the program but doesn't perform any actions
    // This function can be called to initialize a program state, but it's empty in this case.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // msg!("Greetings from: {:?}", ctx.program_id); // Log a greeting message with the program ID (commented out)
        Ok(())
    }

    // The set_favorites function allows a user to set their favorite color, number, and hobbies
    // Takes color (String), number (u64), and hobbies (Vec<String>) as inputs
    pub fn set_favorites(
        ctx: Context<SetFavorites>, 
        color: String, 
        number: u64, 
        hobbies: Vec<String>,
    ) -> Result<()> {
        msg!("Setting favorites");  // Log message indicating that the favorites are being set

        let user_pubkey = ctx.accounts.user.key();  // Get the public key of the user making the transaction

        // Log the program ID and the details being set for the user's favorites
        msg!("Program id: {}", ctx.program_id);
        msg!(
            "Setting {}'s favorite number to {} and color to {}",
            user_pubkey,
            number,
            color
        );
        msg!("Hobbies: {:?}", hobbies);  // Log the hobbies being set

        // Store the user's favorites in the `favorites` account
        ctx.accounts.favorites.set_inner(Favorites { 
            color,  // Store the favorite color
            number, // Store the favorite number
            hobbies // Store the hobbies list
        });

        Ok(())
    }
}

// The accounts structure for the Initialize function (no specific accounts in this function)
#[derive(Accounts)]
pub struct Initialize {}

// The accounts structure for the SetFavorites function, where we define the necessary accounts
#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]  // The `user` account will be mutable, as it will sign the transaction
    pub user: Signer<'info>,  // The user signing the transaction

    // The `favorites` account, which is initialized for the user with a unique seed
    #[account(
        init,  // Initialize the account
        payer = user,  // The user will pay for the account creation
        seeds = [b"favorites", user.key().as_ref()],  // Use the user's public key as a unique seed for the PDA
        space = 8 + Favorites::INIT_SPACE,  // Allocate enough space for the Favorites data
        bump  // Ensure the account is created with the correct bump seed
    )]
    pub favorites: Account<'info, Favorites>,  // The account storing the user's favorite data

    pub system_program: Program<'info, System>,  // System program, used to create new accounts
}

// The Favorites account structure, where we define the data that will be stored in the account
#[account]
#[derive(InitSpace)]  // The InitSpace trait will automatically calculate the space required for this struct
pub struct Favorites {
    #[max_len(50)]  // Limit the favorite color to 50 characters max
    pub color: String,  // Favorite color field

    pub number: u64,  // Favorite number field

    #[max_len(5, 50)]  // Limit hobbies to a list of up to 5 items, each with a max length of 50 characters
    pub hobbies: Vec<String>,  // List of favorite hobbies
}

// Purpose: Create a 'Favorites' account where users can modify their favorite color, number, and hobbies
