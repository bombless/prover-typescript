import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { twiceArea } from './geometry-area';
import { chordLengthSq } from './geometry-chord';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a: Term = pair(numeral(1), numeral(2));
const b: Term = pair(numeral(3), numeral(4));
const c: Term = pair(numeral(5), numeral(6));

/** A concrete triangle carries zero-area, chord, and distance certificates. */
export const triangleAreaChordBundleType: Term = prod(
  eq(Nat, app(app(app(twiceArea, a), b), c), { kind: 'Zero' }),
  prod(
    eq(Nat, app(app(chordLengthSq, a), b), numeral(11)),
    prod(
      eq(Nat, app(app(chordLengthSq, b), c), numeral(39)),
      eq(Nat, app(app(distanceSq, a), c), numeral(17)))));

export const triangleAreaChordBundleProof: Term = pair(
  refl(Nat, { kind: 'Zero' }),
  pair(
    refl(Nat, numeral(11)),
    pair(refl(Nat, numeral(39)), refl(Nat, numeral(17)))));
