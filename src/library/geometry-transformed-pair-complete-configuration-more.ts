import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { distanceSq } from './geometry-distance';
import { midpoint } from './geometry-segment';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const u = (k: Term, p: Term, d: Term): Term => transform(k, p, d);
const v = (k: Term, q: Term, d: Term): Term => transform(k, q, d);
const m = (k: Term, p: Term, q: Term, d: Term): Term => app(app(midpoint, u(k, p, d)), v(k, q, d));
const selfRelation = (x: Term): Term => prod(
  app(app(onCircle, x), pair(x, app(normSq, x))),
  prod(app(app(onVerticalLine, x), fst(x)), app(app(incidence, x), pair(x, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }))))
);
const selfProof = (x: Term): Term => pair(
  { kind: 'Refl', type: Nat, value: app(normSq, x) },
  pair({ kind: 'Refl', type: Nat, value: fst(x) }, { kind: 'Refl', type: Nat, value: fst(x) })
);

/** A pair of transformed points exposes all three basic binary metrics. */
export const pairMetricType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  prod(
    eq(Nat, app(app(distanceSq, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0))), app(app(distanceSq, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0)))),
    prod(
      eq(Nat, app(app(dot2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0))), app(app(dot2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0)))),
      eq(Nat, app(app(cross2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0))), app(app(cross2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'p'), 'k');
export const pairMetricProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, app(app(distanceSq, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0)))),
    pair(refl(Nat, app(app(dot2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0)))), refl(Nat, app(app(cross2, u(variable(3), variable(2), variable(0))), v(variable(3), variable(1), variable(0)))))
  ), 'd'), 'q'), 'p'), 'k');

/** The transformed pair's midpoint carries a complete self relation bundle. */
export const pairMidpointRelationType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2, selfRelation(m(variable(3), variable(2), variable(1), variable(0))), 'd'), 'q'), 'p'), 'k');
export const pairMidpointRelationProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2, selfProof(m(variable(3), variable(2), variable(1), variable(0))), 'd'), 'q'), 'p'), 'k');
