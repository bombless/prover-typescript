import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { midpoint } from './geometry-segment';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const d = pair(numeral(2), numeral(1));
const a = app(app(translate, pair(numeral(1), numeral(2))), d);
const b = app(app(translate, pair(numeral(3), numeral(4))), d);
const c = app(app(translate, pair(numeral(5), numeral(6))), d);
const triangle = pair(a, pair(b, c));

/** One translated triangle feeds vertex coordinates, norms, edges, and midpoints. */
export const triangleType: Term = eq(Triangle2, triangle,
  pair(pair(numeral(3), numeral(3)), pair(pair(numeral(5), numeral(5)), pair(numeral(7), numeral(7)))));
export const triangleProof: Term = refl(Triangle2,
  pair(pair(numeral(3), numeral(3)), pair(pair(numeral(5), numeral(5)), pair(numeral(7), numeral(7)))));

export const aNormType: Term = eq(Nat, app(normSq, a), numeral(18));
export const aNormProof: Term = refl(Nat, numeral(18));
export const bNormType: Term = eq(Nat, app(normSq, b), numeral(50));
export const bNormProof: Term = refl(Nat, numeral(50));
export const cNormType: Term = eq(Nat, app(normSq, c), numeral(98));
export const cNormProof: Term = refl(Nat, numeral(98));

export const abDistanceType: Term = eq(Nat, app(app(distanceSq, a), b), numeral(30));
export const abDistanceProof: Term = refl(Nat, numeral(30));
export const bcDistanceType: Term = eq(Nat, app(app(distanceSq, b), c), numeral(70));
export const bcDistanceProof: Term = refl(Nat, numeral(70));

export const abMidpointType: Term = eq(Point2, app(app(midpoint, a), b), pair(numeral(3), numeral(5)));
export const abMidpointProof: Term = refl(Point2, pair(numeral(3), numeral(5)));
export const bcMidpointType: Term = eq(Point2, app(app(midpoint, b), c), pair(numeral(5), numeral(7)));
export const bcMidpointProof: Term = refl(Point2, pair(numeral(5), numeral(7)));
