import { Term, Nat, prod, pair, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const base: Term = pair(numeral(2), numeral(3));
const direction: Term = pair(numeral(4), numeral(5));
const line: Term = pair(base, direction);

/** A concrete line carries both projections and eta reconstruction. */
export const lineStructureBundleType: Term = prod(
  eq(Point2, fst(line), base),
  prod(
    eq(Point2, snd(line), direction),
    eq(Line2, pair(fst(line), snd(line)), line)));

export const lineStructureBundleProof: Term = pair(
  refl(Point2, base),
  pair(
    refl(Point2, direction),
    refl(Line2, line)));
