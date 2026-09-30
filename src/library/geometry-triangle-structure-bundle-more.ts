import { Term, Nat, prod, pair, eq, refl, fst, snd } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
const a: Term = pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } });
const b: Term = pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } });
const c: Term = pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } } } });
const triangle: Term = pair(a, pair(b, c));

/** A concrete triangle carries all three vertex projections and eta reconstruction. */
export const triangleStructureBundleType: Term = prod(
  eq(Point2, fst(triangle), a),
  prod(
    eq(Point2, fst(snd(triangle)), b),
    prod(
      eq(Point2, snd(snd(triangle)), c),
      eq(Triangle2, pair(fst(triangle), pair(fst(snd(triangle)), snd(snd(triangle)))), triangle))));

export const triangleStructureBundleProof: Term = pair(
  refl(Point2, a),
  pair(
    refl(Point2, b),
    pair(
      refl(Point2, c),
      refl(Triangle2, triangle))));
