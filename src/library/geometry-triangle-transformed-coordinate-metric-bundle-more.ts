import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const d = pair(numeral(1), numeral(1));
const a = pair(numeral(1), numeral(2));
const b = pair(numeral(3), numeral(4));
const c = pair(numeral(5), numeral(6));
const transform = (p: Term): Term => app(app(translate, app(rotate90, p)), d);
const ta = transform(a); const tb = transform(b); const tc = transform(c);

/** A concrete transformed triangle bundles all vertex coordinates and metric values. */
export const transformedTriangleCoordinateMetricType: Term = prod(
  eq(Point2, ta, pair(numeral(3), numeral(2))),
  prod(
    eq(Point2, tb, pair(numeral(5), numeral(4))),
    prod(
      eq(Point2, tc, pair(numeral(7), numeral(6))),
      prod(
        eq(Nat, app(app(distanceSq, ta), tb), numeral(23)),
        prod(
          eq(Nat, app(app(distanceSq, tb), tc), numeral(59)),
          prod(
            eq(Nat, app(normSq, ta), numeral(13)),
            eq(Nat, app(normSq, tc), numeral(85))))))));

export const transformedTriangleCoordinateMetricProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(2))),
  pair(
    refl(Point2, pair(numeral(5), numeral(4))),
    pair(
      refl(Point2, pair(numeral(7), numeral(6))),
      pair(
        refl(Nat, numeral(23)),
        pair(
          refl(Nat, numeral(59)),
          pair(refl(Nat, numeral(13)), refl(Nat, numeral(85))))))));
