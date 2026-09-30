import { Term, Nat, Zero, variable, pi, lambda, app, natRec } from '../syntax/ast';
import { pred } from './pred';

/** Truncated subtraction, recursing on the first argument:
 * sub n 0 = n and sub n (Succ m) = pred (sub n m). */
export const sub: Term = lambda(Nat,
  lambda(Nat,
    natRec(lambda(Nat, Nat), variable(1),
      lambda(Nat, lambda(Nat, app(pred, variable(0)))),
      variable(0)), 'm'), 'n');
export const subType: Term = pi(Nat, pi(Nat, Nat));
