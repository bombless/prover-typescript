import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { rotate90 } from './geometry-rotations';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a = app(rotate90, pair(numeral(1), numeral(2)));
const b = app(rotate90, pair(numeral(3), numeral(4)));
const c = app(rotate90, pair(numeral(5), numeral(6)));
const triangle = pair(a, pair(b, c));

export const triangleType: Term = eq(Triangle2, triangle,
  pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5)))));
export const triangleProof: Term = refl(Triangle2,
  pair(pair(numeral(2), numeral(1)), pair(pair(numeral(4), numeral(3)), pair(numeral(6), numeral(5)))));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(5));
export const aNormProof: Term = refl(Nat, numeral(5));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(25));
export const bNormProof: Term = refl(Nat, numeral(25));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(11));
export const abDistanceProof: Term = refl(Nat, numeral(11));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(2), numeral(3)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(2), numeral(3)));
export const aCircleType: Term = app(app(onCircle, a), pair(a, numeral(5)));
export const aCircleProof: Term = refl(Nat, numeral(5));
