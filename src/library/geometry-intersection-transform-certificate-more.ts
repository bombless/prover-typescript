import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { incidence } from './geometry-incidence';
import { onCircle } from './geometry-circle';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
const p: Term = pair(numeral(2), numeral(3));
const rotated: Term = app(rotate90, p);
const line: Term = pair(pair(numeral(3), numeral(0)), pair(numeral(1), numeral(0)));
const circle: Term = pair(rotated, numeral(13));

/** A rotated point carries transformed coordinates and intersection certificates. */
export const rotatedIntersectionType: Term = prod(
  eq(Point2, rotated, pair(numeral(3), numeral(2))),
  prod(
    app(app(incidence, rotated), line),
    app(app(onCircle, rotated), circle)));

export const rotatedIntersectionProof: Term = pair(
  refl(Point2, pair(numeral(3), numeral(2))),
  pair(
    refl(Nat, numeral(3)),
    refl(Nat, numeral(13))));
