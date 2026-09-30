import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);

/** Coordinate swap preserves this concrete squared norm. */
export const rotateNormType: Term = eq(Nat,
  app(normSq, app(rotate90, pair(numeral(3), numeral(4)))), numeral(25));
export const rotateNormProof: Term = refl(Nat, numeral(25));

/** The coordinate-copy reflection preserves this concrete squared norm. */
export const reflectNormType: Term = eq(Nat,
  app(normSq, app(reflectX, pair(numeral(3), numeral(4)))), numeral(25));
export const reflectNormProof: Term = refl(Nat, numeral(25));

/** A concrete distance after applying the same translation to both points. */
export const translatedPairDistanceType: Term = eq(Nat,
  app(app(distanceSq, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
    app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(4), numeral(3)))),
  app(app(distanceSq, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))),
    app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(4), numeral(3)))));
export const translatedPairDistanceProof: Term = refl(Nat, app(app(distanceSq, app(app(translate, pair(numeral(1), numeral(2))), pair(numeral(3), numeral(4)))), app(app(translate, pair(numeral(2), numeral(1))), pair(numeral(4), numeral(3)))));

/** A reflected point's dot product with a concrete axis vector. */
export const reflectedAxisDotType: Term = eq(Nat,
  app(app(dot2, app(reflectX, pair(numeral(5), numeral(2)))), pair(numeral(1), numeral(0))), numeral(5));
export const reflectedAxisDotProof: Term = refl(Nat, numeral(5));

/** Two coordinate swaps return the original concrete norm. */
export const rotateTwiceNormType: Term = eq(Nat,
  app(normSq, app(rotate90, app(rotate90, pair(numeral(6), numeral(1))))), numeral(37));
export const rotateTwiceNormProof: Term = refl(Nat, numeral(37));
