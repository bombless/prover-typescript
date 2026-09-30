import { Term, Nat, prod, pair, app, eq, refl, fst, snd } from '../syntax/ast';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(
  pair(numeral(1), numeral(2)),
  pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

/** A concrete triangle combines vertex coordinates with dot and cross products of two edges. */
export const triangleCoordinateVectorBundleType: Term = prod(
  eq(Nat, fst(fst(triangle)), numeral(1)),
  prod(
    eq(Nat, snd(fst(triangle)), numeral(2)),
    prod(
      eq(Nat, app(app(dot2, fst(triangle)), fst(snd(triangle))), numeral(11)),
      prod(
        eq(Nat, app(app(cross2, fst(triangle)), fst(snd(triangle))), numeral(10)),
        eq(Nat, app(app(dot2, fst(snd(triangle))), snd(snd(triangle))), numeral(39))))));

export const triangleCoordinateVectorBundleProof: Term = pair(
  refl(Nat, numeral(1)),
  pair(
    refl(Nat, numeral(2)),
    pair(
      refl(Nat, numeral(11)),
      pair(refl(Nat, numeral(10)), refl(Nat, numeral(39))))));
