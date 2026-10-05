import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const transform = (p: Term): Term => app(app(translate, app(app(scaleVec, numeral(2)), p)), pair(numeral(1), numeral(1)));
const a = transform(pair(numeral(1), numeral(2)));
const b = transform(pair(numeral(2), numeral(1)));
const c = transform(pair(numeral(3), numeral(2)));
const d = transform(pair(numeral(4), numeral(3)));
const quad = pair(a, pair(b, pair(c, d)));

export const quadType: Term = eq(Quadrilateral2, quad,
  pair(pair(numeral(3), numeral(5)), pair(pair(numeral(5), numeral(3)), pair(pair(numeral(7), numeral(5)), pair(numeral(9), numeral(7))))));
export const quadProof: Term = refl(Quadrilateral2,
  pair(pair(numeral(3), numeral(5)), pair(pair(numeral(5), numeral(3)), pair(pair(numeral(7), numeral(5)), pair(numeral(9), numeral(7))))));
export const aNormType: Term = eq(Nat, app(normSq, a), numeral(34));
export const aNormProof: Term = refl(Nat, numeral(34));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(34));
export const bNormProof: Term = refl(Nat, numeral(34));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), app(app(distanceSq, a), b));
export const abDistanceProof: Term = refl(Nat, app(app(distanceSq, a), b));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), app(app(distanceSq, b), c));
export const bcDistanceProof: Term = refl(Nat, app(app(distanceSq, b), c));
export const abDotType: Term = eq(Nat, app(app(dot2, a), b), app(app(dot2, a), b));
export const abDotProof: Term = refl(Nat, app(app(dot2, a), b));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(3), numeral(3)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(3), numeral(3)));
