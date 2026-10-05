import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const transform = (p: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, numeral(2)), p)))),
    pair(numeral(1), numeral(2)));
const a = transform(pair(numeral(1), numeral(1)));
const b = transform(pair(numeral(2), numeral(3)));
const c = transform(pair(numeral(4), numeral(2)));
const d = transform(pair(numeral(5), numeral(4)));
const quad = pair(a, pair(b, pair(c, d)));

export const quadType: Term = eq(Quadrilateral2, quad,
  pair(pair(numeral(3), numeral(4)), pair(pair(numeral(7), numeral(6)), pair(pair(numeral(5), numeral(10)), pair(numeral(9), numeral(12))))));
export const quadProof: Term = refl(Quadrilateral2,
  pair(pair(numeral(3), numeral(4)), pair(pair(numeral(7), numeral(6)), pair(pair(numeral(5), numeral(10)), pair(numeral(9), numeral(12))))));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(25));
export const aNormProof: Term = refl(Nat, numeral(25));
export const dNormType: Term = eq(Nat, app(normSq, d), numeral(225));
export const dNormProof: Term = refl(Nat, numeral(225));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(45));
export const abDistanceProof: Term = refl(Nat, numeral(45));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(95));
export const bcDistanceProof: Term = refl(Nat, numeral(95));
export const cdDistanceType: Term = eq(Nat, app(app(distanceSq, c), d), numeral(165));
export const cdDistanceProof: Term = refl(Nat, numeral(165));
export const abDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(45));
export const abDotProof: Term = refl(Nat, numeral(45));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(3), numeral(6)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(3), numeral(6)));
export const dCircleType: Term = app(app(onCircle, d), pair(d, numeral(225)));
export const dCircleProof: Term = refl(Nat, numeral(225));
