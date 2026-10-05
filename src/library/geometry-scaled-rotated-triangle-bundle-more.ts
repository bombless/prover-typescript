import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const transform = (p: Term): Term => app(rotate90, app(app(scaleVec, numeral(2)), p));
const a = transform(pair(numeral(1), numeral(2)));
const b = transform(pair(numeral(3), numeral(1)));
const c = transform(pair(numeral(2), numeral(4)));
const triangle = pair(a, pair(b, c));

export const triangleType: Term = eq(Triangle2, triangle,
  pair(pair(numeral(4), numeral(2)), pair(pair(numeral(2), numeral(6)), pair(numeral(8), numeral(4)))));
export const triangleProof: Term = refl(Triangle2,
  pair(pair(numeral(4), numeral(2)), pair(pair(numeral(2), numeral(6)), pair(numeral(8), numeral(4)))));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(20));
export const aNormProof: Term = refl(Nat, numeral(20));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(40));
export const bNormProof: Term = refl(Nat, numeral(40));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(20));
export const abDistanceProof: Term = refl(Nat, numeral(20));
export const abDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(20));
export const abDotProof: Term = refl(Nat, numeral(20));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(4), numeral(6)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(4), numeral(6)));
