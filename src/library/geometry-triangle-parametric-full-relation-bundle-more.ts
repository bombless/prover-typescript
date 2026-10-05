import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
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
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };

const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const transformedTriangle = (k: Term, t: Term, d: Term): Term => pair(
  transform(k, fst(t), d),
  pair(transform(k, fst(snd(t)), d), transform(k, snd(snd(t)), d))
);
const selfCircle = (q: Term): Term => pair(q, app(normSq, q));
const selfLine = (q: Term): Term => pair(q, pair(one, zero));
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), selfCircle(q)),
  prod(
    app(app(onVerticalLine, q), fst(q)),
    app(app(incidence, q), selfLine(q))
  )
);
const relationProof = (q: Term): Term => pair(
  refl(Nat, app(normSq, q)),
  pair(refl(Nat, fst(q)), refl(Nat, fst(q)))
);

/** An arbitrary-scale four-stage transform reconstructs a triangle from its transformed vertices. */
export const parametricTriangleEtaType: Term = pi(Nat, pi(Triangle2, pi(Point2,
  eq(Triangle2,
    pair(fst(transformedTriangle(variable(2), variable(1), variable(0))),
      pair(fst(snd(transformedTriangle(variable(2), variable(1), variable(0)))),
        snd(snd(transformedTriangle(variable(2), variable(1), variable(0)))))),
    transformedTriangle(variable(2), variable(1), variable(0))), 'd'), 't'), 'k');
export const parametricTriangleEtaProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2,
  refl(Triangle2, transformedTriangle(variable(2), variable(1), variable(0))), 'd'), 't'), 'k');

/** Every vertex of an arbitrary-scale four-stage transformed triangle carries a self-relation bundle. */
export const parametricTriangleRelationType: Term = pi(Nat, pi(Triangle2, pi(Point2,
  (() => {
    const a = transform(variable(2), fst(variable(1)), variable(0));
    const b = transform(variable(2), fst(snd(variable(1))), variable(0));
    const c = transform(variable(2), snd(snd(variable(1))), variable(0));
    return prod(relation(a), prod(relation(b), relation(c)));
  })(), 'd'), 't'), 'k');
export const parametricTriangleRelationProof: Term = lambda(Nat, lambda(Triangle2, lambda(Point2,
  (() => {
    const a = transform(variable(2), fst(variable(1)), variable(0));
    const b = transform(variable(2), fst(snd(variable(1))), variable(0));
    const c = transform(variable(2), snd(snd(variable(1))), variable(0));
    return pair(relationProof(a), pair(relationProof(b), relationProof(c)));
  })(), 'd'), 't'), 'k');
