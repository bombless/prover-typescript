import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { addVec2 } from './geometry-vectors';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Nested scalar operations compute on a concrete vector. */
export const scaleTwiceConcreteType: Term = eq(Vec2,
  app(app(scaleVec, numeral(2)), app(app(scaleVec, numeral(3)), pair(numeral(1), numeral(2)))),
  pair(numeral(6), numeral(12)));
export const scaleTwiceConcreteProof: Term = refl(Vec2, pair(numeral(6), numeral(12)));

/** Scaling a concrete vector sum computes coordinatewise. */
export const scaleSumConcreteType: Term = eq(Vec2,
  app(app(scaleVec, numeral(3)), app(app(addVec2, pair(numeral(1), numeral(2))), pair(numeral(2), numeral(4)))),
  pair(numeral(9), numeral(18)));
export const scaleSumConcreteProof: Term = refl(Vec2, pair(numeral(9), numeral(18)));

/** The two projections of nested scaling are explicit formulas. */
export const nestedScaleFstType: Term = pi(Nat, pi(Nat, pi(Vec2,
  eq(Nat, fst(app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0)))),
    fst(app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0))))), 'v'), 'k2'), 'k1');
export const nestedScaleFstProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2,
  refl(Nat, fst(app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0))))), 'v'), 'k2'), 'k1');
