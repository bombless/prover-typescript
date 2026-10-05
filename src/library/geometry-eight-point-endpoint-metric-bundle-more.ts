import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';

export const Point2: Term = prod(Nat, Nat);
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const a = (k: Term, p: Term, d: Term): Term => transform(k, p, d);
const b = (k: Term, q: Term, d: Term): Term => transform(k, q, d);
export const endpointMetricType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  prod(
    eq(Nat, app(app(distanceSq, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0))), app(app(distanceSq, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0)))),
    prod(
      eq(Nat, app(app(dot2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0))), app(app(dot2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0)))),
      eq(Nat, app(app(cross2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0))), app(app(cross2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'p'), 'k');
export const endpointMetricProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, app(app(distanceSq, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0)))),
    pair(
      refl(Nat, app(app(dot2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0)))),
      refl(Nat, app(app(cross2, a(variable(3), variable(2), variable(0))), b(variable(3), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'p'), 'k');
