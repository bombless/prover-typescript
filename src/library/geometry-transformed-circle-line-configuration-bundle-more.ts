import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { incidence } from './geometry-incidence';
import { onVerticalLine } from './geometry-line';

export const Point2: Term = prod(Nat, Nat);
export const Circle2: Term = prod(Point2, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const circle = (q: Term): Term => pair(q, app(normSq, q));
const line = (q: Term): Term => pair(q, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));
const configuration = (q: Term): Term => prod(
  app(app(onCircle, q), circle(q)),
  prod(app(app(incidence, q), line(q)), app(app(onVerticalLine, q), fst(q)))
);
const configurationProof = (q: Term): Term => pair(
  { kind: 'Refl', type: Nat, value: app(normSq, q) },
  pair({ kind: 'Refl', type: Nat, value: fst(q) }, { kind: 'Refl', type: Nat, value: fst(q) })
);

/** A transformed point simultaneously inhabits a circle, line, and vertical-line configuration. */
export const transformedConfigurationType: Term = pi(Nat, pi(Point2, pi(Point2,
  configuration(transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
export const transformedConfigurationProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  configurationProof(transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');

/** The configuration's circle center is definitionally the transformed point. */
export const transformedConfigurationCenterType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Point2, fst(circle(transform(variable(2), variable(1), variable(0)))), transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
export const transformedConfigurationCenterProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Point2, transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
