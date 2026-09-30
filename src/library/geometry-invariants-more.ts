import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling, rotation, and reflection form a closed computable pipeline. */
export const scaleRotateReflectType: Term = eq(Vec2,
  app(reflectX, app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4))))),
  pair(numeral(8), numeral(6)));
export const scaleRotateReflectProof: Term = refl(Vec2, pair(numeral(8), numeral(6)));

export const scaleRotateReflectNormType: Term = eq(Nat,
  app(normSq, app(reflectX, app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4)))))), numeral(100));
export const scaleRotateReflectNormProof: Term = refl(Nat, numeral(100));

/** Translation after scaling has a concrete dot product with an axis vector. */
export const scaleTranslateDotType: Term = eq(Nat,
  app(app(dot2, app(app(translate, pair(numeral(1), numeral(2))), app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(4))))),
    pair(numeral(2), numeral(1))), numeral(24));
export const scaleTranslateDotProof: Term = refl(Nat, numeral(24));

/** Distance between a transformed point and a reflected point computes. */
export const transformedDistanceMoreType: Term = eq(Nat,
  app(app(distanceSq, app(app(translate, pair(numeral(1), numeral(1))), app(app(scaleVec, numeral(2)), pair(numeral(2), numeral(3))))),
    app(reflectX, pair(numeral(4), numeral(5)))), numeral(55));
export const transformedDistanceMoreProof: Term = refl(Nat, numeral(55));
