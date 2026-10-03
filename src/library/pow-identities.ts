import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl } from '../syntax/ast';
import { powTerm } from './pow';
import { mulTerm } from './mul';
import { mulOne, oneMul } from './mul-identities';
import { equalityTransitivity } from './equality';

const one = succ(Zero);

/** n^0 = 1, including the natural-number convention 0^0 = 1. */
export const powZeroType: Term = pi(Nat, eq(Nat, powTerm(variable(0), Zero), one), 'n');
export const powZeroProof: Term = lambda(Nat, refl(Nat, one), 'n');

/** n^(k+1) = n * n^k, exposing the existing recursion equation. */
export const powSuccType: Term = pi(Nat, pi(Nat,
  eq(Nat, powTerm(variable(1), succ(variable(0))), mulTerm(variable(1), powTerm(variable(1), variable(0)))), 'k'), 'n');
export const powSuccProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, mulTerm(variable(1), powTerm(variable(1), variable(0)))), 'k'), 'n');

/** n^1 = n, from multiplication's right-unit theorem. */
export const powOneType: Term = pi(Nat, eq(Nat, powTerm(variable(0), one), variable(0)), 'n');
export const powOneProof: Term = lambda(Nat, mulOne(variable(0)), 'n');

/** 1^k = 1, by induction using multiplication's left-unit theorem. */
export const onePowType: Term = pi(Nat, eq(Nat, powTerm(one, variable(0)), one), 'k');
const onePowMotive = lambda(Nat, eq(Nat, powTerm(one, variable(0)), one), 'k');
export const onePowProof: Term = lambda(Nat,
  natRec(onePowMotive, refl(Nat, one),
    lambda(Nat, lambda(app(onePowMotive, variable(0)),
      equalityTransitivity(Nat, mulTerm(one, powTerm(one, variable(1))), powTerm(one, variable(1)), one,
        oneMul(powTerm(one, variable(1))), variable(0)), 'ih'), 'k'),
    variable(0)), 'k');

/** Zero raised to any positive natural exponent is zero. */
export const zeroPowSuccType: Term = pi(Nat, eq(Nat, powTerm(Zero, succ(variable(0))), Zero), 'k');
export const zeroPowSuccProof: Term = lambda(Nat, refl(Nat, Zero), 'k');

export function powZero(n: Term): Term { return app(powZeroProof, n); }
export function powSucc(n: Term, k: Term): Term { return app(app(powSuccProof, n), k); }
export function powOne(n: Term): Term { return app(powOneProof, n); }
export function onePow(k: Term): Term { return app(onePowProof, k); }
export function zeroPowSucc(k: Term): Term { return app(zeroPowSuccProof, k); }
