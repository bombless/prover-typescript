import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Quadrilateral2 } from './geometry-quadrilateral-four-stage-structure-laws-more';
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
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const a = (k: Term, q: Term, d: Term): Term => transform(k, fst(q), d);
const b = (k: Term, q: Term, d: Term): Term => transform(k, fst(snd(q)), d);
const c = (k: Term, q: Term, d: Term): Term => transform(k, fst(snd(snd(q))), d);
const e = (k: Term, q: Term, d: Term): Term => transform(k, snd(snd(snd(q))), d);
const mAC = (k: Term, q: Term, d: Term): Term => app(app(midpoint, a(k, q, d)), c(k, q, d));
const mBD = (k: Term, q: Term, d: Term): Term => app(app(midpoint, b(k, q, d)), e(k, q, d));
const relation = (m: Term): Term => prod(
  app(app(onCircle, m), pair(m, app(normSq, m))),
  prod(app(app(onVerticalLine, m), fst(m)), app(app(incidence, m), pair(m, pair(one, zero))))
);
const relationProof = (m: Term): Term => pair(
  refl(Nat, app(normSq, m)),
  pair(refl(Nat, fst(m)), refl(Nat, fst(m)))
);

/** Both transformed diagonal midpoints expose their defining midpoint terms. */
export const diagonalMidpointShapeType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2,
  prod(
    eq(Point2, mAC(variable(2), variable(1), variable(0)), mAC(variable(2), variable(1), variable(0))),
    eq(Point2, mBD(variable(2), variable(1), variable(0)), mBD(variable(2), variable(1), variable(0)))
  ), 'd'), 'q'), 'k');
export const diagonalMidpointShapeProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2,
  pair(
    refl(Point2, mAC(variable(2), variable(1), variable(0))),
    refl(Point2, mBD(variable(2), variable(1), variable(0)))
  ), 'd'), 'q'), 'k');

/** Both diagonal midpoints carry circle, vertical-line, and incidence certificates. */
export const diagonalMidpointRelationType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2,
  prod(relation(mAC(variable(2), variable(1), variable(0))), relation(mBD(variable(2), variable(1), variable(0)))),
  'd'), 'q'), 'k');
export const diagonalMidpointRelationProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2,
  pair(
    relationProof(mAC(variable(2), variable(1), variable(0))),
    relationProof(mBD(variable(2), variable(1), variable(0)))
  ), 'd'), 'q'), 'k');

export const diagonalMidpointCoordinateType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2,
  prod(eq(Nat, fst(mAC(variable(2), variable(1), variable(0))), fst(mAC(variable(2), variable(1), variable(0)))),
    eq(Nat, snd(mBD(variable(2), variable(1), variable(0))), snd(mBD(variable(2), variable(1), variable(0))))), 'd'), 'q'), 'k');
export const diagonalMidpointCoordinateProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2,
  pair(refl(Nat, fst(mAC(variable(2), variable(1), variable(0)))), refl(Nat, snd(mBD(variable(2), variable(1), variable(0))))), 'd'), 'q'), 'k');
