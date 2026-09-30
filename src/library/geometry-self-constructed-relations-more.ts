import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const Circle2: Term = prod(Point2, Nat);

/** Every point is on the circle centered at itself with its own norm as radius. */
export const selfCircleType: Term = pi(Point2,
  app(app(onCircle, variable(0)), pair(variable(0), app(normSq, variable(0)))), 'p');
export const selfCircleProof: Term = lambda(Point2,
  refl(Nat, app(normSq, variable(0))), 'p');

/** Every point lies on the vertical line named by its first coordinate. */
export const selfVerticalType: Term = pi(Point2,
  app(app(onVerticalLine, variable(0)), fst(variable(0))), 'p');
export const selfVerticalProof: Term = lambda(Point2,
  refl(Nat, fst(variable(0))), 'p');

/** Every point is incident to a line whose base is that point. */
export const selfIncidenceType: Term = pi(Point2, pi(prod(Nat, Nat),
  app(app(incidence, variable(1)), pair(variable(1), variable(0))), 'd'), 'p');
export const selfIncidenceProof: Term = lambda(Point2, lambda(prod(Nat, Nat),
  refl(Nat, fst(variable(1))), 'd'), 'p');

/** A circle built from a point and its norm has that point as center. */
export const selfCircleCenterType: Term = pi(Point2,
  eq(Point2, fst(pair(variable(0), app(normSq, variable(0)))), variable(0)), 'p');
export const selfCircleCenterProof: Term = lambda(Point2,
  refl(Point2, variable(0)), 'p');

/** A line built from a point and a direction has that point as base. */
export const selfLineBaseType: Term = pi(Point2, pi(prod(Nat, Nat),
  eq(Point2, fst(pair(variable(1), variable(0))), variable(1)), 'd'), 'p');
export const selfLineBaseProof: Term = lambda(Point2, lambda(prod(Nat, Nat),
  refl(Point2, variable(1)), 'd'), 'p');
