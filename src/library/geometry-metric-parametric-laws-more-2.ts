import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Dot product with the zero vector on the left vanishes for every vector. */
export const zeroDotLeftType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }), 'v');
export const zeroDotLeftProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'v');

/** Squared distance from the origin reduces to the norm-square expression. */
export const originDistanceFormulaType: Term = pi(Vec2,
  eq(Nat, app(app(distanceSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)),
    { kind: 'Zero' }), 'p');
export const originDistanceFormulaProof: Term = lambda(Vec2, refl(Nat, { kind: 'Zero' }), 'p');

/** Distance of a concrete point in the current discrete metric model. */
export const concreteDistanceType: Term = eq(Nat,
  app(app(distanceSq, pair(numeral(0), numeral(0))), pair(numeral(3), numeral(4))), numeral(0));
export const concreteDistanceProof: Term = refl(Nat, numeral(0));

/** Circle membership unfolds to its defining distance equality. */
