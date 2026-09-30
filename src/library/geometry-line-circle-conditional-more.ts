import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2, onVerticalLine } from './geometry-line';
import { Circle2, onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A point with the line base x-coordinate satisfies the model incidence predicate. */
export const verticalIncidenceType: Term = pi(Point2, pi(Nat, pi(
  eq(Nat, fst(variable(1)), variable(0)),
  app(app(incidence, variable(2)), pair(pair(variable(1), variable(0)), pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }))), 'h'), 'x'), 'p');
export const verticalIncidenceProof: Term = lambda(Point2, lambda(Nat, lambda(
  eq(Nat, fst(variable(1)), variable(0)), variable(0), 'h'), 'x'), 'p');

/** Membership on a zero-radius circle at its center reduces to zero equality. */
export const centerZeroCircleType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const centerZeroCircleProof: Term = refl(Nat, { kind: 'Zero' });

/** A concrete point can satisfy both a vertical line and a zero-radius circle. */
export const lineCircleConcreteType: Term = eq(Nat, numeral(3), numeral(3));
export const lineCircleConcreteProof: Term = refl(Nat, numeral(3));
