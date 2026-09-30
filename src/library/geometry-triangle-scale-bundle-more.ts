import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const k: Term = numeral(2);
const v1: Term = pair(numeral(1), numeral(2));
const v2: Term = pair(numeral(3), numeral(4));
const v3: Term = pair(numeral(5), numeral(6));

/** All three vertices of a concrete triangle are scaled together. */
export const scaledTriangleBundleType: Term = prod(
  eq(Point2, app(app(scaleVec, k), v1), pair(numeral(2), numeral(4))),
  prod(
    eq(Point2, app(app(scaleVec, k), v2), pair(numeral(6), numeral(8))),
    eq(Point2, app(app(scaleVec, k), v3), pair(numeral(10), numeral(12)))));

export const scaledTriangleBundleProof: Term = pair(
  refl(Point2, pair(numeral(2), numeral(4))),
  pair(
    refl(Point2, pair(numeral(6), numeral(8))),
    refl(Point2, pair(numeral(10), numeral(12)))));
