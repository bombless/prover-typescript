import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const Circle2: Term = prod(Point2, Nat);
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const lineAt = (p: Term): Term => pair(p, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));
const circleAt = (p: Term): Term => pair(p, app(normSq, p));

/** Any four-stage transformed point lies on its self-circle. */
export const transformedSelfCircleType: Term = pi(Nat, pi(Point2, pi(Point2,
  app(app(onCircle, transform(variable(2), variable(1), variable(0))),
    circleAt(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
export const transformedSelfCircleProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, app(normSq, transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');

/** Any four-stage transformed point lies on the vertical line named by its x-coordinate. */
export const transformedSelfVerticalType: Term = pi(Nat, pi(Point2, pi(Point2,
  app(app(onVerticalLine, transform(variable(2), variable(1), variable(0))),
    fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
export const transformedSelfVerticalProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');

/** Any four-stage transformed point is incident to a line based at itself. */
export const transformedSelfIncidenceType: Term = pi(Nat, pi(Point2, pi(Point2,
  app(app(incidence, transform(variable(2), variable(1), variable(0))),
    lineAt(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
export const transformedSelfIncidenceProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, fst(transform(variable(2), variable(1), variable(0)))), 'd'), 'p'), 'k');
