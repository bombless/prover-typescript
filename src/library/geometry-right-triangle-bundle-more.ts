import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x: Term = pair(numeral(3), { kind: 'Zero' });
const y: Term = pair({ kind: 'Zero' }, numeral(4));

/** A concrete axis pair carries perpendicularity, cross, and length certificates. */
export const rightTriangleBundleType: Term = prod(
  eq(Nat, app(app(dot2, x), y), { kind: 'Zero' }),
  prod(
    eq(Nat, app(app(cross2, x), y), numeral(12)),
    prod(
      eq(Nat, app(normSq, x), numeral(9)),
      eq(Nat, app(normSq, y), numeral(16)))));

export const rightTriangleBundleProof: Term = pair(
  refl(Nat, { kind: 'Zero' }),
  pair(
    refl(Nat, numeral(12)),
    pair(refl(Nat, numeral(9)), refl(Nat, numeral(16)))));
