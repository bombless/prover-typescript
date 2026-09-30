import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), pair(numeral(1), numeral(2)));
const a = transform(pair(numeral(1), numeral(1)));
const b = transform(pair(numeral(2), numeral(3)));
const c = transform(pair(numeral(4), numeral(2)));
const d = transform(pair(numeral(5), numeral(4)));
const quad = pair(a, pair(b, pair(c, d)));

export const quadType: Term = eq(Quadrilateral2, quad,
  pair(pair(numeral(2), numeral(3)), pair(pair(numeral(4), numeral(4)), pair(pair(numeral(3), numeral(6)), pair(numeral(5), numeral(7))))));
export const quadProof: Term = refl(Quadrilateral2,
  pair(pair(numeral(2), numeral(3)), pair(pair(numeral(4), numeral(4)), pair(pair(numeral(3), numeral(6)), pair(numeral(5), numeral(7))))));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(13));
export const aNormProof: Term = refl(Nat, numeral(13));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(32));
export const bNormProof: Term = refl(Nat, numeral(32));
export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(20));
export const abDistanceProof: Term = refl(Nat, numeral(20));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(36));
export const bcDistanceProof: Term = refl(Nat, numeral(36));
export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(2), numeral(4)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(2), numeral(4)));
export const abDotType: Term = eq(Nat, app(app(dot2, a), b), numeral(20));
export const abDotProof: Term = refl(Nat, numeral(20));
