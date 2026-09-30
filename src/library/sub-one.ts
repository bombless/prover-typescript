import { Term, Nat, Zero, variable, pi, lambda, app, succ, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { pred } from './pred';

const one = succ(Zero);

/** Truncated subtraction by one is predecessor. */
export const subOneType: Term = pi(Nat,
  eq(Nat, app(app(sub, variable(0)), one), app(pred, variable(0))), 'n');

export const subOneProof: Term = lambda(Nat,
  refl(Nat, app(pred, variable(0))), 'n');
