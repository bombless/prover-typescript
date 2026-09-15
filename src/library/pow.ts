import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec } from '../syntax/ast';
import { mulTerm } from './mul';

/**
 * pow n k = n^k.
 *
 *   pow n 0 = 1
 *   pow n (Succ k) = mul n (pow n k)
 *
 * Since the Core has no separate numeral literal, 1 is Succ Zero. The
 * recursion is on the second argument so closed powers reduce through the
 * existing Nat.rec iota rules.
 */
export const pow: Term = lambda(
  Nat,
  lambda(
    Nat,
    natRec(
      lambda(Nat, Nat),
      succ(Zero),
      lambda(
        Nat,
        lambda(
          Nat,
          mulTerm(variable(3), variable(0))
        )
      ),
      variable(0)
    ),
    'k'
  ),
  'n'
);

export const powType: Term = pi(Nat, pi(Nat, Nat));

export function powTerm(base: Term, exponent: Term): Term {
  return app(app(pow, base), exponent);
}
