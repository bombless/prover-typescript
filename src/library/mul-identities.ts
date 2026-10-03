import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl } from '../syntax/ast';
import { mulTerm } from './mul';
import { addZeroProof } from './add-zero';
import { equalityCongruence } from './equality';

const one = succ(Zero);

/** Multiplication by zero or one, on either side, for an arbitrary natural. */
export const zeroMulType: Term = pi(Nat, eq(Nat, mulTerm(Zero, variable(0)), Zero), 'n');
export const zeroMulProof: Term = lambda(Nat, refl(Nat, Zero), 'n');

export const mulZeroType: Term = pi(Nat, eq(Nat, mulTerm(variable(0), Zero), Zero), 'n');
const mulZeroMotive = lambda(Nat, eq(Nat, mulTerm(variable(0), Zero), Zero), 'n');
export const mulZeroProof: Term = lambda(Nat,
  natRec(mulZeroMotive, refl(Nat, Zero),
    lambda(Nat, lambda(app(mulZeroMotive, variable(0)), variable(0), 'ih'), 'n'),
    variable(0)), 'n');

// mul 1 n reduces to add n 0, whose right identity requires induction.
export const oneMulType: Term = pi(Nat, eq(Nat, mulTerm(one, variable(0)), variable(0)), 'n');
export const oneMulProof: Term = addZeroProof;

export const mulOneType: Term = pi(Nat, eq(Nat, mulTerm(variable(0), one), variable(0)), 'n');
const mulOneMotive = lambda(Nat, eq(Nat, mulTerm(variable(0), one), variable(0)), 'n');
export const mulOneProof: Term = lambda(Nat,
  natRec(mulOneMotive, refl(Nat, Zero),
    lambda(Nat, lambda(app(mulOneMotive, variable(0)),
      equalityCongruence(Nat, Nat, lambda(Nat, succ(variable(0))),
        mulTerm(variable(1), one), variable(1), variable(0)), 'ih'), 'n'),
    variable(0)), 'n');

export function zeroMul(n: Term): Term { return app(zeroMulProof, n); }
export function mulZero(n: Term): Term { return app(mulZeroProof, n); }
export function oneMul(n: Term): Term { return app(oneMulProof, n); }
export function mulOne(n: Term): Term { return app(mulOneProof, n); }
