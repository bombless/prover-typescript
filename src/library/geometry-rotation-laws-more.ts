import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { normSq, dot2 } from './geometry-metrics';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** A parameterized coordinate projection law for the quarter-turn map. */
export const rotateFstGeneralType: Term = pi(Vec2,
  eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))), 'v');
export const rotateFstGeneralProof: Term = lambda(Vec2, refl(Nat, snd(variable(0))), 'v');

export const rotateSndGeneralType: Term = pi(Vec2,
  eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0))), 'v');
export const rotateSndGeneralProof: Term = lambda(Vec2, refl(Nat, fst(variable(0))), 'v');

/** Two rotations recover a concrete point and its norm. */
export const rotateTwicePointType: Term = eq(Vec2,
  app(rotate90, app(rotate90, pair(numeral(7), numeral(2)))), pair(numeral(7), numeral(2)));
export const rotateTwicePointProof: Term = refl(Vec2, pair(numeral(7), numeral(2)));

export const rotateTwiceNormConcreteType: Term = eq(Nat,
  app(normSq, app(rotate90, app(rotate90, pair(numeral(7), numeral(2))))), numeral(53));
export const rotateTwiceNormConcreteProof: Term = refl(Nat, numeral(53));

/** A rotated vector's dot product with the x-axis is its original y-coordinate. */
