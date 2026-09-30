import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { twiceArea } from './geometry-area';
import { chordLengthSq } from './geometry-chord';
import { distanceSq } from './geometry-distance';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const a = pair(numeral(2), numeral(3));
const b = pair(numeral(1), numeral(1));
const c = pair(numeral(4), numeral(2));
const circle = pair(a, numeral(13));

/** A concrete triangle carries its (degenerate-model) area and all three chords. */
export const areaType: Term = eq(Nat, app(app(app(twiceArea, a), b), c), numeral(0));
export const areaProof: Term = refl(Nat, numeral(0));
export const abChordType: Term = eq(Nat, app(app(chordLengthSq, a), b), numeral(5));
export const abChordProof: Term = refl(Nat, numeral(5));
export const bcChordType: Term = eq(Nat, app(app(chordLengthSq, b), c), numeral(6));
export const bcChordProof: Term = refl(Nat, numeral(6));
export const caChordType: Term = eq(Nat, app(app(chordLengthSq, c), a), numeral(14));
export const caChordProof: Term = refl(Nat, numeral(14));

/** The first vertex is a member of its self-centered radius circle. */
export const selfCircleType: Term = app(app(onCircle, a), circle);
export const selfCircleProof: Term = refl(Nat, numeral(13));

/** Chord notation and distance notation coincide definitionally. */
export const chordDistanceType: Term = eq(Nat, app(app(chordLengthSq, a), c), app(app(distanceSq, a), c));
export const chordDistanceProof: Term = refl(Nat, numeral(14));
