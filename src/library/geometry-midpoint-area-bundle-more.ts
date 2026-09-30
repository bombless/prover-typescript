import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpointDiscrete } from './geometry-barycentric';
import { twiceArea } from './geometry-area';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

/** A concrete discrete midpoint and area certificate can be carried together. */
export const midpointAreaBundleType: Term = prod(
  eq(Point2, app(app(midpointDiscrete, a), b), pair(numeral(1), numeral(4))),
  eq(Nat, app(app(app(twiceArea, a), b), c), { kind: 'Zero' }));

export const midpointAreaBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  refl(Nat, { kind: 'Zero' }));
