import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling a sum exposes the expected first coordinate expression. */
export const scaleSumFstType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    fst(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'v'), 'u'), 'k');
export const scaleSumFstProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'v'), 'u'), 'k');

/** Scaling a sum exposes the expected second coordinate expression. */
export const scaleSumSndType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    snd(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u'), 'k');
export const scaleSumSndProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u'), 'k');

/** A concrete scaled vector sum computes completely. */
export const scaleSumConcreteType: Term = eq(Vec2,
  app(app(scaleVec, numeral(3)), app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(4), numeral(5)))),
  pair(numeral(15), numeral(21)));
export const scaleSumConcreteProof: Term = refl(Vec2, pair(numeral(15), numeral(21)));
