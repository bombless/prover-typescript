import { Term, Nat, Zero, variable, pi, lambda, app, natRec } from '../syntax/ast';
import { addTerm } from './nat';

/**
 * mul n m = n-fold addition of m.
 *
 *   mul 0 m = 0
 *   mul (Succ n) m = add m (mul n m)
 *
 * The recursion is on the first argument so closed multiplication reduces
 * directly through the existing Nat.rec iota rules.
 */
export const mul: Term = lambda(
  Nat,
  lambda(
    Nat,
    natRec(
      lambda(Nat, Nat),
      Zero,
      lambda(
        Nat,
        lambda(
          Nat,
          addTerm(variable(2), variable(0))
        )
      ),
      variable(1)
    ),
    'm'
  ),
  'n'
);

export const mulType: Term = pi(Nat, pi(Nat, Nat));

export function mulTerm(a: Term, b: Term): Term {
  return app(app(mul, a), b);
}
