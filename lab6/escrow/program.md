PROGRAM:

    1. IX -- Make Offer (Account 1 -> state modificat)
    2. IX -- Take Offer (Account 2 -> state modificat)
    3. IX -- Close Offer

Accounts: (owner: Program)

Account 1: owner: Program (PDA)
    -mentine state
    -seeds = ["abc", pubkey1, pubkey2] -> poate sa semneze pt program
Account 2: owner: Program (not PDA)
    -mentine state
    -nu poate sa semneze pentru program
