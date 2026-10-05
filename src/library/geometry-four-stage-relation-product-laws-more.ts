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
const point = (k: Term, p: Term, d: Term): Term => transform(k, p, d);
const selfCircle = (q: Term): Term => pair(q, app(normSq, q));
const selfLine = (q: Term): Term => pair(q, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));

/** A transformed point simultaneously satisfies its circle, vertical-line, and incidence certificates. */
export const transformedRelationProductType: Term = pi(Nat, pi(Point2, pi(Point2,
  prod(
    app(app(onCircle, point(variable(2), variable(1), variable(0))), selfCircle(point(variable(2), variable(1), variable(0)))),
    prod(
      app(app(onVerticalLine, point(variable(2), variable(1), variable(0))), fst(point(variable(2), variable(1), variable(0)))),
      app(app(incidence, point(variable(2), variable(1), variable(0))), selfLine(point(variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'p'), 'k');

export const transformedRelationProductProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, app(normSq, point(variable(2), variable(1), variable(0)))),
    pair(
      refl(Nat, fst(point(variable(2), variable(1), variable(0)))),
      refl(Nat, fst(point(variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'p'), 'k');
