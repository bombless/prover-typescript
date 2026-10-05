import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { midpoint } from './geometry-segment';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const Circle2: Term = prod(Point2, Nat);
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const left = (k: Term, p: Term, d: Term): Term => transform(k, p, d);
const right = (k: Term, q: Term, d: Term): Term => transform(k, q, d);
const mid = (k: Term, p: Term, q: Term, d: Term): Term =>
  app(app(midpoint, left(k, p, d)), right(k, q, d));
const selfCircle = (m: Term): Term => pair(m, app(normSq, m));
const selfLine = (m: Term): Term => pair(m, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));

/** The midpoint of two transformed points has its defining midpoint coordinates. */
export const transformedMidpointShapeType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  eq(Point2, mid(variable(3), variable(2), variable(1), variable(0)),
    pair(fst(left(variable(3), variable(2), variable(0))), snd(right(variable(3), variable(1), variable(0))))),
  'd'), 'q'), 'p'), 'k');
export const transformedMidpointShapeProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Point2, pair(fst(left(variable(3), variable(2), variable(0))), snd(right(variable(3), variable(1), variable(0))))),
  'd'), 'q'), 'p'), 'k');

/** The transformed midpoint simultaneously has self-circle, vertical, and incidence certificates. */
export const transformedMidpointRelationType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  prod(
    app(app(onCircle, mid(variable(3), variable(2), variable(1), variable(0))), selfCircle(mid(variable(3), variable(2), variable(1), variable(0)))),
    prod(
      app(app(onVerticalLine, mid(variable(3), variable(2), variable(1), variable(0))), fst(mid(variable(3), variable(2), variable(1), variable(0)))),
      app(app(incidence, mid(variable(3), variable(2), variable(1), variable(0))), selfLine(mid(variable(3), variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'p'), 'k');
export const transformedMidpointRelationProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  pair(
    refl(Nat, app(normSq, mid(variable(3), variable(2), variable(1), variable(0)))),
    pair(
      refl(Nat, fst(mid(variable(3), variable(2), variable(1), variable(0)))),
      refl(Nat, fst(mid(variable(3), variable(2), variable(1), variable(0))))
    )
  ), 'd'), 'q'), 'p'), 'k');
