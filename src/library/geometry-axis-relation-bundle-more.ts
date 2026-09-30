import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { dot2, normSq } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { perpendicularVec } from './geometry-relations';
import { parallelVec } from './geometry-parallel';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const x: Term = pair(numeral(3), { kind: 'Zero' });
const y: Term = pair({ kind: 'Zero' }, numeral(4));

/** Concrete axis vectors carry perpendicular, parallel-family, norm, dot, and cross certificates. */
export const axisRelationBundleType: Term = prod(
  app(app(perpendicularVec, x), y),
  prod(
    app(app(parallelVec, x), pair(numeral(5), { kind: 'Zero' })),
    prod(
      eq(Nat, app(normSq, x), numeral(9)),
      prod(
        eq(Nat, app(normSq, y), numeral(16)),
        prod(
          eq(Nat, app(app(dot2, x), y), { kind: 'Zero' }),
          eq(Nat, app(app(cross2, x), y), numeral(12)))))));

export const axisRelationBundleProof: Term = pair(
  refl(Nat, { kind: 'Zero' }),
  pair(
    refl(Nat, { kind: 'Zero' }),
    pair(
      refl(Nat, numeral(9)),
      pair(
        refl(Nat, numeral(16)),
        pair(refl(Nat, { kind: 'Zero' }), refl(Nat, numeral(12)))))));
