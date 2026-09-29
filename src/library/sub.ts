import { Term, Nat, Zero, app, eq, lambda, natRec, pi, refl, succ, variable } from '../syntax/ast';

/** Saturating predecessor: pred 0 = 0 and pred (Succ n) = n. */
export const pred: Term = lambda(Nat,
  natRec(lambda(Nat, Nat), Zero, lambda(Nat, lambda(Nat, variable(1))), variable(0)), 'n');
export const predType: Term = pi(Nat, Nat);

export function predTerm(value: Term): Term { return app(pred, value); }

/** Truncated subtraction repeatedly takes the predecessor of the first argument. */
export const sub: Term = lambda(Nat, lambda(Nat,
  natRec(lambda(Nat, Nat), variable(1), lambda(Nat, lambda(Nat, predTerm(variable(0)))), variable(0)),
  'm'), 'n');
export const subType: Term = pi(Nat, pi(Nat, Nat));

export function subTerm(left: Term, right: Term): Term { return app(app(sub, left), right); }

export const predZeroType: Term = eq(Nat, predTerm(Zero), Zero);
export const predZeroProof: Term = refl(Nat, Zero);
export const predSuccType: Term = pi(Nat, eq(Nat, predTerm(succ(variable(0))), variable(0)), 'n');
export const predSuccProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

export const subZeroType: Term = pi(Nat, eq(Nat, subTerm(variable(0), Zero), variable(0)), 'n');
export const subZeroProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');
export const subSuccType: Term = pi(Nat, pi(Nat,
  eq(Nat, subTerm(variable(1), succ(variable(0))), predTerm(subTerm(variable(1), variable(0)))), 'm'), 'n');
export const subSuccProof: Term = lambda(Nat, lambda(Nat,
  refl(Nat, predTerm(subTerm(variable(1), variable(0)))), 'm'), 'n');
