import { Term, Nat, Zero, variable, pi, lambda, app, succ, natRec, eq, refl } from '../syntax/ast';

/** predecessor with pred 0 = 0 and pred (Succ n) = n. */
export const pred: Term = lambda(Nat,
  natRec(lambda(Nat, Nat), Zero, lambda(Nat, lambda(Nat, variable(1))), variable(0)),
  'n');

export const predType: Term = pi(Nat, Nat, 'n');
export const predZeroType: Term = eq(Nat, { kind: 'App', fn: pred, arg: Zero }, Zero);
export const predZeroProof: Term = refl(Nat, Zero);

export const predSuccType: Term = pi(Nat,
  eq(Nat,
    { kind: 'App', fn: pred, arg: succ(variable(0)) },
    variable(0)), 'n');
export const predSuccProof: Term = lambda(Nat, refl(Nat, variable(0)), 'n');

/** Predecessor of a successor recovers its predecessor after one more successor. */
export const predSuccSuccType: Term = pi(Nat,
  eq(Nat, app(pred, succ(succ(variable(0)))), succ(variable(0))), 'n');
export const predSuccSuccProof: Term = lambda(Nat, refl(Nat, succ(variable(0))), 'n');

/** Predecessor of three successors recovers two successors. */
export const predSuccTripleType: Term = pi(Nat,
  eq(Nat, app(pred, succ(succ(succ(variable(0))))), succ(succ(variable(0)))), 'n');
export const predSuccTripleProof: Term = lambda(Nat, refl(Nat, succ(succ(variable(0)))), 'n');

/** Predecessor of four successors recovers three successors. */
export const predSuccQuadType: Term = pi(Nat,
  eq(Nat, app(pred, succ(succ(succ(succ(variable(0)))))), succ(succ(succ(variable(0))))), 'n');
export const predSuccQuadProof: Term = lambda(Nat, refl(Nat, succ(succ(succ(variable(0))))), 'n');
