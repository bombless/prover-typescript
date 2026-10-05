import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const transformedX = (k: Term, p: Term, d: Term): Term =>
  addTerm(fst(d), mulTerm(k, snd(p)));
const transformedLine = (k: Term, p: Term, d: Term): Term =>
  pair(pair(fst(transform(k, p, d)), { kind: 'Zero' }), pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));

/** A four-stage transformed point lies on the vertical line determined by its transformed x-coordinate. */
export const transformedVerticalType: Term = pi(Nat, pi(Point2, pi(Point2,
  app(app(onVerticalLine, transform(variable(2), variable(1), variable(0))),
    fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
export const transformedVerticalProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');

/** The same transformed point is incident with a line whose base has that x-coordinate. */
export const transformedIncidenceType: Term = pi(Nat, pi(Point2, pi(Point2,
  app(app(incidence, transform(variable(2), variable(1), variable(0))),
    transformedLine(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
export const transformedIncidenceProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
