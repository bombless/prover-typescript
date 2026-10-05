import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), pair(q, app(normSq, q))),
  prod(app(app(onVerticalLine, q), fst(q)), app(app(incidence, q), pair(q, pair(one, zero))))
);
const proof = (q: Term): Term => pair(
  { kind: 'Refl', type: Nat, value: app(normSq, q) },
  pair({ kind: 'Refl', type: Nat, value: fst(q) }, { kind: 'Refl', type: Nat, value: fst(q) })
);
const vertices = (k: Term, q: Term, d: Term): [Term, Term, Term, Term] => [
  transform(k, fst(q), d), transform(k, fst(snd(q)), d),
  transform(k, fst(snd(snd(q))), d), transform(k, snd(snd(snd(q))), d),
];

/** Every vertex of an arbitrary-scale transformed quadrilateral carries a self-relation bundle. */
export const parametricQuadrilateralRelationType: Term = pi(Nat, pi(Quadrilateral2, pi(Point2,
  (() => {
    const [a,b,c,d] = vertices(variable(2), variable(1), variable(0));
    return prod(relation(a), prod(relation(b), prod(relation(c), relation(d))));
  })(), 'd'), 'q'), 'k');
export const parametricQuadrilateralRelationProof: Term = lambda(Nat, lambda(Quadrilateral2, lambda(Point2,
  (() => {
    const [a,b,c,d] = vertices(variable(2), variable(1), variable(0));
    return pair(proof(a), pair(proof(b), pair(proof(c), proof(d))));
  })(), 'd'), 'q'), 'k');
