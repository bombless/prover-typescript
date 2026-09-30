import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(2), numeral(3));
const b: Term = pair(numeral(1), numeral(1));
const c: Term = pair(numeral(4), numeral(2));

/** Three edge distance certificates are bundled for one concrete triangle. */
export const triangleEdgeDistanceBundleType: Term = prod(
  eq(Nat, app(app(distanceSq, a), b), numeral(5)),
  prod(
    eq(Nat, app(app(distanceSq, b), c), numeral(6)),
    eq(Nat, app(app(distanceSq, c), a), numeral(14))));

export const triangleEdgeDistanceBundleProof: Term = pair(
  refl(Nat, numeral(5)),
  pair(refl(Nat, numeral(6)), refl(Nat, numeral(14))));
