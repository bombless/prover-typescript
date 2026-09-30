import { Term, Nat, prod, pair, fst, snd, eq, refl, variable, pi, lambda, app } from '../syntax/ast';

/** A coordinate point over the current Nat model. */
export const Point2: Term = prod(Nat, Nat);
export const origin2: Term = pair({ kind: 'Zero' }, { kind: 'Zero' });
export const point = (x: Term, y: Term): Term => pair(x, y);
export const xCoord = (p: Term): Term => fst(p);
export const yCoord = (p: Term): Term => snd(p);

export const origin2Type: Term = Point2;
export const origin2Proof: Term = origin2;
export const originXType: Term = eq(Nat, fst(origin2), { kind: 'Zero' });
export const originXProof: Term = refl(Nat, { kind: 'Zero' });
export const originYType: Term = eq(Nat, snd(origin2), { kind: 'Zero' });
export const originYProof: Term = refl(Nat, { kind: 'Zero' });

/** Coordinatewise translation by a fixed Nat vector. */
export const translate2: Term = lambda(Point2,
  lambda(Point2,
    pair(
      app(app({ kind: 'Var', index: 2 }, fst(variable(0))), fst(variable(1))),
      app(app({ kind: 'Var', index: 2 }, snd(variable(0))), snd(variable(1)))), 'delta'), 'p');
