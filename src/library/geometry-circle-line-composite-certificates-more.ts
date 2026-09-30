import { Term, Nat, prod, pair, app, eq, refl } from '../syntax/ast';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { normSq } from './geometry-metrics';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
const point: Term = pair(numeral(3), numeral(4));
const circle: Term = pair(point, numeral(25));
const line: Term = pair(pair(numeral(3), numeral(0)), pair(numeral(1), numeral(0)));

/** A concrete point can carry circle membership, line incidence, and norm certificates together. */
export const circleLineMetricType: Term = prod(
  app(app(onCircle, point), circle),
  prod(
    app(app(incidence, point), line),
    eq(Nat, app(normSq, point), numeral(25))));
export const circleLineMetricProof: Term = pair(
  refl(Nat, numeral(25)),
  pair(
    refl(Nat, numeral(3)),
    refl(Nat, numeral(25))));
