import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const v1: Term = pair(numeral(1), numeral(2));
const v2: Term = pair(numeral(3), numeral(4));
const v3: Term = pair(numeral(5), numeral(6));

/** All three vertices of a concrete triangle are rotated together. */
export const rotatedTriangleBundleType: Term = prod(
  eq(Point2, app(rotate90, v1), pair(numeral(2), numeral(1))),
  prod(
    eq(Point2, app(rotate90, v2), pair(numeral(4), numeral(3))),
    eq(Point2, app(rotate90, v3), pair(numeral(6), numeral(5)))));

export const rotatedTriangleBundleProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(1))),
  pair(
    refl(Point2, pair(numeral(4), numeral(3))),
    refl(Point2, pair(numeral(6), numeral(5)))));
