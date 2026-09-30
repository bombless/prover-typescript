import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { reflectX } from './geometry-reflections';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const v1: Term = pair(numeral(1), numeral(2));
const v2: Term = pair(numeral(3), numeral(4));
const v3: Term = pair(numeral(5), numeral(6));

/** All three vertices of a concrete triangle pass through the coordinate-copy reflection. */
export const reflectedTriangleBundleType: Term = prod(
  eq(Point2, app(reflectX, v1), v1),
  prod(
    eq(Point2, app(reflectX, v2), v2),
    eq(Point2, app(reflectX, v3), v3)));

export const reflectedTriangleBundleProof: Term = pair(
  refl(Point2, v1),
  pair(refl(Point2, v2), refl(Point2, v3)));
