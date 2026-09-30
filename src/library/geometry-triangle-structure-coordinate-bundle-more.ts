import { Term, Nat, prod, pair, eq, refl, fst, snd } from '../syntax/ast';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const triangle: Term = pair(
  pair(numeral(1), numeral(2)),
  pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));

/** A concrete triangle exposes the six scalar coordinates of its three vertices. */
export const triangleStructureCoordinateBundleType: Term = prod(
  eq(Nat, fst(fst(triangle)), numeral(1)),
  prod(
    eq(Nat, snd(fst(triangle)), numeral(2)),
    prod(
      eq(Nat, fst(fst(snd(triangle))), numeral(3)),
      prod(
        eq(Nat, snd(fst(snd(triangle))), numeral(4)),
        prod(
          eq(Nat, fst(snd(snd(triangle))), numeral(5)),
          eq(Nat, snd(snd(snd(triangle))), numeral(6)))))));

export const triangleStructureCoordinateBundleProof: Term = pair(
  refl(Nat, numeral(1)),
  pair(
    refl(Nat, numeral(2)),
    pair(
      refl(Nat, numeral(3)),
      pair(
        refl(Nat, numeral(4)),
        pair(refl(Nat, numeral(5)), refl(Nat, numeral(6)))))));
