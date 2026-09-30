import { Term, Nat, prod, pair, eq, refl, fst, snd } from '../syntax/ast';
import { Circle2 } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const center: Term = pair(numeral(2), numeral(3));
const circle: Term = pair(center, numeral(5));

/** A concrete circle carries center, radius, and eta reconstruction certificates together. */
export const circleStructureBundleType: Term = prod(
  eq(Point2, fst(circle), center),
  prod(
    eq(Nat, snd(circle), numeral(5)),
    eq(Circle2, pair(fst(circle), snd(circle)), circle)));

export const circleStructureBundleProof: Term = pair(
  refl(Point2, center),
  pair(
    refl(Nat, numeral(5)),
    refl(Circle2, circle)));
