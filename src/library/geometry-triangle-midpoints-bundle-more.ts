import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

/** The three discrete edge midpoints of a concrete triangle are bundled. */
export const triangleMidpointsBundleType: Term = prod(
  eq(Point2, app(app(midpoint, a), b), pair(numeral(1), numeral(4))),
  prod(
    eq(Point2, app(app(midpoint, b), c), pair(numeral(3), numeral(6))),
    eq(Point2, app(app(midpoint, c), a), pair(numeral(5), numeral(2)))));

export const triangleMidpointsBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  pair(
    refl(Point2, pair(numeral(3), numeral(6))),
    refl(Point2, pair(numeral(5), numeral(2)))));
