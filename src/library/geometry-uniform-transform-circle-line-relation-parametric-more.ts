import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';
import { addTerm } from './nat';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';

export const Point2: Term = prod(Nat, Nat);

const transformed = (p: Term, d: Term): Term => app(app(translate, app(rotate90, p)), d);

/** A transformed point has its explicitly expanded coordinates. */
export const transformedPointType: Term = pi(Point2, pi(Point2,
  eq(Point2, transformed(variable(1), variable(0)),
    pair(addTerm(snd(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))), 'd'), 'p');
export const transformedPointProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, pair(addTerm(snd(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))), 'd'), 'p');

/** Every transformed point lies on the vertical line named by its expanded x-coordinate. */
export const transformedVerticalType: Term = pi(Point2, pi(Point2,
  app(app(onVerticalLine, transformed(variable(1), variable(0))),
    addTerm(snd(variable(1)), fst(variable(0)))), 'd'), 'p');
export const transformedVerticalProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), fst(variable(0)))), 'd'), 'p');

/** Every transformed point is incident to a line whose base has its expanded x-coordinate. */
export const transformedIncidenceType: Term = pi(Point2, pi(Point2, pi(Point2,
  app(app(incidence, transformed(variable(2), variable(1))),
    pair(pair(addTerm(snd(variable(2)), fst(variable(1))), snd(variable(0))), variable(0))),
  'dir'), 'd'), 'p');
export const transformedIncidenceProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(2)), fst(variable(1)))), 'dir'), 'd'), 'p');

/** Transforming a circle preserves its radius and transforms its center. */
export const transformedCircleType: Term = pi(Point2, pi(Circle2,
  eq(Circle2,
    pair(transformed(fst(variable(0)), variable(1)), snd(variable(0))),
    pair(transformed(fst(variable(0)), variable(1)), snd(variable(0)))), 'c'), 'd');
export const transformedCircleProof: Term = lambda(Point2, lambda(Circle2,
  refl(Circle2, pair(transformed(fst(variable(0)), variable(1)), snd(variable(0)))), 'c'), 'd');

/** Transforming a line preserves its direction slot and transforms its base. */
export const transformedLineType: Term = pi(Point2, pi(Line2,
  eq(Line2,
    pair(transformed(fst(variable(0)), variable(1)), snd(variable(0))),
    pair(transformed(fst(variable(0)), variable(1)), snd(variable(0)))), 'l'), 'd');
export const transformedLineProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(transformed(fst(variable(0)), variable(1)), snd(variable(0)))), 'l'), 'd');
