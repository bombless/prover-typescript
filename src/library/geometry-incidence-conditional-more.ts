import { Term, Nat, prod, variable, pi, lambda, app, eq } from '../syntax/ast';
import { incidence, Point2, Line2, originLine } from './geometry-incidence';

/** Incidence follows from the defining equality of x coordinates. */
export const incidenceOfXEqualityType: Term = pi(Point2, pi(Line2, pi(
  eq(Nat, fstPointDomain(), fstLineBaseDomain()),
  app(app(incidence, variable(2)), variable(1)), 'h'), 'l'), 'p');
export const incidenceOfXEqualityProof: Term = lambda(Point2, lambda(Line2, lambda(
  eq(Nat, fstPointDomain(), fstLineBaseDomain()), variable(0), 'h'), 'l'), 'p');

function fstPoint(): Term { return { kind: 'Fst', pair: variable(2) }; }
function fstLineBase(): Term { return { kind: 'Fst', pair: { kind: 'Fst', pair: variable(1) } }; }
function fstPointDomain(): Term { return { kind: 'Fst', pair: variable(1) }; }
function fstLineBaseDomain(): Term { return { kind: 'Fst', pair: { kind: 'Fst', pair: variable(0) } }; }

/** A point is incident with a line when its x coordinate matches the base x coordinate. */
export const incidenceConditionalType: Term = incidenceOfXEqualityType;
export const incidenceConditionalProof: Term = incidenceOfXEqualityProof;

/** A point whose x coordinate is zero is incident with the origin line. */
export const originLineIncidenceType: Term = pi(Point2, pi(
  eq(Nat, { kind: 'Fst', pair: variable(0) }, { kind: 'Zero' }),
  app(app(incidence, variable(1)), originLine), 'h'), 'p');

export const originLineIncidenceProof: Term = lambda(Point2, lambda(
  eq(Nat, { kind: 'Fst', pair: variable(0) }, { kind: 'Zero' }),
  variable(0), 'h'), 'p');
