import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const a = app(reflectX, pair(numeral(1), numeral(2)));
const b = app(reflectX, pair(numeral(2), numeral(4)));
const c = app(reflectX, pair(numeral(4), numeral(3)));
const d = app(reflectX, pair(numeral(5), numeral(1)));
const quad = pair(a, pair(b, pair(c, d)));

export const quadType: Term = eq(Quadrilateral2, quad,
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(2), numeral(4)), pair(pair(numeral(4), numeral(3)), pair(numeral(5), numeral(1))))));
export const quadProof: Term = refl(Quadrilateral2,
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(2), numeral(4)), pair(pair(numeral(4), numeral(3)), pair(numeral(5), numeral(1))))));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(5));
export const aNormProof: Term = refl(Nat, numeral(5));
export const cNormType: Term = eq(Nat, app(normSq, c), numeral(25));
export const cNormProof: Term = refl(Nat, numeral(25));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(10));
export const abDistanceProof: Term = refl(Nat, numeral(10));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(20));
export const bcDistanceProof: Term = refl(Nat, numeral(20));
export const abDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(10));
export const abDotProof: Term = refl(Nat, numeral(10));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(1), numeral(4)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(1), numeral(4)));
export const cCircleType: Term = app(app(onCircle, c), pair(c, numeral(25)));
export const cCircleProof: Term = refl(Nat, numeral(25));
