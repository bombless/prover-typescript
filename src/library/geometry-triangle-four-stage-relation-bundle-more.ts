import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd } from '../syntax/ast';
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
const transform = (p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, { kind: 'Succ', value: { kind: 'Zero' } }), p)))), d);
const vertices = (t: Term, d: Term): [Term, Term, Term] => [
  transform(fst(t), d),
  transform(fst(snd(t)), d),
  transform(snd(snd(t)), d),
];
const selfCircle = (q: Term): Term => pair(q, app(normSq, q));
const selfLine = (q: Term): Term => pair(q, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' }));
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), selfCircle(q)),
  prod(
    app(app(onVerticalLine, q), fst(q)),
    app(app(incidence, q), selfLine(q))
  )
);
const relationProof = (q: Term): Term => pair(
  { kind: 'Refl', type: Nat, value: app(normSq, q) },
  pair(
    { kind: 'Refl', type: Nat, value: fst(q) },
    { kind: 'Refl', type: Nat, value: fst(q) }
  )
);

/** A transformed triangle carries relation certificates for all three vertices. */
export const transformedTriangleRelationsType: Term = pi(Triangle2, pi(Point2,
  (() => {
    const [a, b, c] = vertices(variable(1), variable(0));
    return prod(relation(a), prod(relation(b), relation(c)));
  })(), 'd'), 't');

export const transformedTriangleRelationsProof: Term = lambda(Triangle2, lambda(Point2,
  (() => {
    const [a, b, c] = vertices(variable(1), variable(0));
    return pair(relationProof(a), pair(relationProof(b), relationProof(c)));
  })(), 'd'), 't');
