import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
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
const a = (k: Term, t: Term, d: Term): Term => transform(k, fst(t), d);
const b = (k: Term, t: Term, d: Term): Term => transform(k, fst(snd(t)), d);
const c = (k: Term, t: Term, d: Term): Term => transform(k, snd(snd(t)), d);
const nested = (k: Term, t: Term, d: Term): Term =>
  app(app(midpoint, app(app(midpoint, a(k, t, d)), b(k, t, d))), c(k, t, d));
const selfCircle = (m: Term): Term => pair(m, app(normSq, m));
const selfLine = (m: Term): Term => pair(m, pair(one, zero));
const relation = (m: Term): Term => prod(
  app(app(onCircle, m), selfCircle(m)),
  prod(app(app(onVerticalLine, m), fst(m)), app(app(incidence, m), selfLine(m)))
);
const relationProof = (m: Term): Term => pair(
  refl(Nat, app(normSq, m)),
  pair(refl(Nat, fst(m)), refl(Nat, fst(m)))
);

/** The nested midpoint is definitionally reconstructed from the two midpoint stages. */
export const nestedMidpointShapeType: Term = pi(Nat, pi(Triangle2, pi(Point2,
  eq(Point2, nested(variable(2), variable(1), variable(0)), nested(variable(2), variable(1), variable(0))),
  'd'), 't'), 'k');
export const nestedMidpointShapeProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2,
  refl(Point2, nested(variable(2), variable(1), variable(0))), 'd'), 't'), 'k');

/** The nested midpoint carries a complete self-relation bundle. */
export const nestedMidpointRelationType: Term = pi(Nat, pi(Triangle2, pi(Point2,
  relation(nested(variable(2), variable(1), variable(0))), 'd'), 't'), 'k');
export const nestedMidpointRelationProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2,
  relationProof(nested(variable(2), variable(1), variable(0))), 'd'), 't'), 'k');
