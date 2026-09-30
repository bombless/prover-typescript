import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { incidence } from './geometry-incidence';
import { onCircle, Circle2 } from './geometry-circle';
import { rotate90 } from './geometry-rotations';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

const point: Term = pair(numeral(2), numeral(3));
const line: Term = pair(pair(numeral(2), numeral(1)), pair(numeral(1), numeral(0)));
const circle: Term = pair(pair(numeral(1), numeral(1)), numeral(5));

/** A concrete point simultaneously has line incidence and circle membership. */
export const lineCirclePairType: Term = prod(
  app(app(incidence, point), line),
  app(app(onCircle, point), circle));
export const lineCirclePairProof: Term = pair(
  refl(Nat, numeral(2)),
  refl(Nat, numeral(5)));

/** Rotation exposes the first coordinate of every point as its original second coordinate. */
export const rotatedFirstCoordinateType: Term = pi(Point2,
  eq(Nat, fst(app(rotate90, variable(0))), snd(variable(0))), 'p');
export const rotatedFirstCoordinateProof: Term = lambda(Point2,
  refl(Nat, snd(variable(0))), 'p');

/** Rotation exposes the second coordinate of every point as its original first coordinate. */
export const rotatedSecondCoordinateType: Term = pi(Point2,
  eq(Nat, snd(app(rotate90, variable(0))), fst(variable(0))), 'p');
export const rotatedSecondCoordinateProof: Term = lambda(Point2,
  refl(Nat, fst(variable(0))), 'p');
