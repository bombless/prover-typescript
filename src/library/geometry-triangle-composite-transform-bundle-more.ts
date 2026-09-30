import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const d: Term = pair(numeral(1), numeral(2));
const v1: Term = pair(numeral(1), numeral(2));
const v2: Term = pair(numeral(3), numeral(4));
const v3: Term = pair(numeral(5), numeral(6));
const transformed = (v: Term): Term => app(rotate90, app(app(translate, v), d));

/** Every vertex of a concrete triangle passes through translate then rotate. */
export const compositeTriangleBundleType: Term = prod(
  eq(Point2, transformed(v1), pair(numeral(4), numeral(2))),
  prod(
    eq(Point2, transformed(v2), pair(numeral(6), numeral(4))),
    eq(Point2, transformed(v3), pair(numeral(8), numeral(6)))));

export const compositeTriangleBundleProof: Term = pair(
  refl(Point2, pair(numeral(4), numeral(2))),
  pair(
    refl(Point2, pair(numeral(6), numeral(4))),
    refl(Point2, pair(numeral(8), numeral(6)))));
