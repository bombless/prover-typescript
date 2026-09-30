import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { dot2, normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const m: Term = app(app(midpoint, a), b);
const axis: Term = pair(numeral(2), { kind: 'Zero' });

/** A midpoint carries dot and norm certificates with a concrete axis vector. */
export const midpointVectorBundleType: Term = prod(
  eq(Point2, m, pair(numeral(1), numeral(4))),
  prod(
    eq(Nat, app(app(dot2, m), axis), numeral(2)),
    eq(Nat, app(normSq, m), numeral(17))));

export const midpointVectorBundleProof: Term = pair(
  refl(Point2, pair(numeral(1), numeral(4))),
  pair(refl(Nat, numeral(2)), refl(Nat, numeral(17))));
