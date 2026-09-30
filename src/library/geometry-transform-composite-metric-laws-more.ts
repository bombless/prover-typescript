import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const TriangleType: Term = prod(Point2, prod(Point2, Point2));
const p: Term = pair(numeral(2), numeral(3));
const q: Term = pair(numeral(4), numeral(5));

/** A rotate-reflect pipeline computes a concrete norm-square. */
export const rotateReflectNormType: Term = eq(Nat, app(normSq, app(reflectX, app(rotate90, p))), numeral(13));
export const rotateReflectNormProof: Term = refl(Nat, numeral(13));

/** A translated and rotated endpoint pair computes a concrete distance expression. */
export const translateRotateDistanceType: Term = eq(Nat,
  app(app(distanceSq, app(rotate90, app(app(translate, p), q))), app(rotate90, q)), numeral(64));
export const translateRotateDistanceProof: Term = refl(Nat, numeral(64));

/** A transformed concrete triangle carries its nested shape and a transformed side metric. */
const triangle: Term = pair(p, pair(q, pair(numeral(6), numeral(7))));
const transformed: Term = pair(app(rotate90, p), pair(app(rotate90, q), app(rotate90, pair(numeral(6), numeral(7)))));
export const transformedTriangleMetricType: Term = prod(
  eq(TriangleType, transformed, transformed),
  eq(Nat, app(app(distanceSq, app(rotate90, p)), app(rotate90, q)), numeral(23)));
export const transformedTriangleMetricProof: Term = pair(
  refl(TriangleType, transformed),
  refl(Nat, numeral(23)));
