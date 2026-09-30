import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { distanceSq } from './geometry-distance';
import { normSq, dot2 } from './geometry-metrics';

export const Point2: Term = prod(Nat, Nat);

/** A concrete translation composed twice reduces to the expected point. */
export const translateTwiceConcreteType: Term = eq(Point2,
  app(app(translate, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), pair(numeral(5), numeral(6))),
  pair(numeral(9), numeral(12)));
export const translateTwiceConcreteProof: Term = refl(Point2, pair(numeral(9), numeral(12)));

/** Rotation and reflection composition on a concrete point. */
export const reflectRotateType: Term = eq(Point2,
  app(reflectX, app(rotate90, pair(numeral(8), numeral(3)))), pair(numeral(3), numeral(8)));
export const reflectRotateProof: Term = refl(Point2, pair(numeral(3), numeral(8)));

/** A transformed point can be measured directly by distance and norm. */
export const translatedNormType: Term = eq(Nat,
  app(normSq, app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(3), numeral(4)))), numeral(50));
export const translatedNormProof: Term = refl(Nat, numeral(50));

export const rotatedDistanceType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, pair(numeral(2), numeral(5))),), pair(numeral(5), numeral(2))), numeral(29));
export const rotatedDistanceProof: Term = refl(Nat, numeral(29));

/** Dot product after reflection reduces through the coordinate-copy map. */
export const reflectedDotType: Term = eq(Nat,
  app(app(dot2, app(reflectX, pair(numeral(3), numeral(4)))), pair(numeral(2), numeral(1))), numeral(10));
export const reflectedDotProof: Term = refl(Nat, numeral(10));

/** Coordinate projections of a translated point are definitionally stable. */
export const translatedFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(app(app(translate, variable(1)), variable(0))),
    fst(app(app(translate, variable(1)), variable(0)))), 'd'), 'p');
export const translatedFstProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, fst(app(app(translate, variable(1)), variable(0)))), 'd'), 'p');

export const translatedSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(app(app(translate, variable(1)), variable(0))),
    snd(app(app(translate, variable(1)), variable(0)))), 'd'), 'p');
export const translatedSndProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, snd(app(app(translate, variable(1)), variable(0)))), 'd'), 'p');
