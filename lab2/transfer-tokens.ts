import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  transferChecked,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const MINT = new PublicKey("7fv1iZ48FZfccWM6Eybao48SE1fqzZ1zw2WeCzMBhsaa");
const SRC = new PublicKey("2ZvKo6vHjAcJeHpr6EzzWqCYm2BZYngWYhbyDT5v5fy7");
const DST = new PublicKey("2ZvKo6vHjAcJeHpr6EzzWqCYm2BZYngWYhbyDT5v5fy7");

async function transferToken(
  mint: PublicKey,
  source: PublicKey,
  dest: PublicKey,
  amount: number,
) {
  console.log(`Transfering token ${mint} ...`);

  const connection = new Connection(clusterApiUrl("devnet"));
  const kp = getKeypairFromEnvironment("SECRET_KEY");

  const sourceAta = getAssociatedTokenAddressSync(mint, source);
  const destAta = await getOrCreateAssociatedTokenAccount(
    connection,
    kp,
    mint,
    dest,
  );

  const sig = await transferChecked(
    connection,
    kp,
    sourceAta,
    mint,
    destAta.address,
    kp,
    amount,
    9,
  );

  const link = getExplorerLink("tx", sig, "devnet");

  console.log(`✅ Done with link: ${link}`);
}

transferToken(MINT, SRC, DST, 1 * 10 ** 9);