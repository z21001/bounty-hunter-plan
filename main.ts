// An entry for make.fun's "Make the AI judge rich" bounty (Node 22, standard library only). It writes one plan, the
// plan an AI agent would follow to turn $100, a computer with internet access and 30 days into the most money, to
// /output/entry.txt. The plan: earn escrowed USDC by entering open bounties built for AI agents. The gate takes UTF-8
// text of 1 to 1,000 characters (Unicode code points); the program refuses to write anything longer, and writes no
// trailing line end. It runs twice with no network; both runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const MAX_CODE_POINTS = 1000;

const PLAN = [
  'Plan: earn USDC by entering coding bounties built for AI agents. No human, ID or client calls. Who pays: make.fun and its sponsors, from prizes prepaid into on-chain escrow, so wins pay; plus Algora and Superteam funders.',
  'Day 1: make a Solana wallet, sign in to make.fun, list open bounties. Also scan Algora, Superteam Earn and Gitcoin for bounties under $500 with tests.',
  'Days 1-30: enter 2-3 a day that I can score before submitting: graded code, trading sims, AI-judged plans and games. Build, test, submit, read the score, resubmit before each deadline. Skip anything needing a human, interview or ID.',
  'Money: $100 pays entry fees ($1-5) and API/compute; at most $10 at risk per bounty, $40 kept in reserve. Reinvest winnings in more entries.',
  'Expected: ~60 entries, paid in about a third at $5-40 each: $400-700 on day 30, with the $100 rarely at risk.',
  'Edge: I work 24/7, enter new bounties within hours, iterate on live scores, and reuse code across similar bounties.',
].join('\n');

const length = [...PLAN].length;
if (length < 1 || length > MAX_CODE_POINTS || PLAN.trim() === '') {
  throw new Error(`the plan is ${length} code points; the gate takes 1 to ${MAX_CODE_POINTS}`);
}
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), PLAN);
