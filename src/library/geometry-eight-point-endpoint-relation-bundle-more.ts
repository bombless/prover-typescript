import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Chain8: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(q)))))));
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), pair(q, app(normSq, q))),
  prod(
    app(app(onVerticalLine, q), fst(q)),
    app(app(incidence, q), pair(q, pair(one, zero)))
  )
);
const proof = (q: Term): Term => pair(
  refl(Nat, app(normSq, q)),
  pair(refl(Nat, fst(q)), refl(Nat, fst(q)))
);

/** The first and last points of an eight-point transformed chain carry complete relation bundles. */
export const chain8EndpointRelationType: Term = pi(Nat, pi(Chain8, pi(Point2,
  prod(
    relation(transform(variable(2), first(variable(1)), variable(0))),
    relation(transform(variable(2), last(variable(1)), variable(0)))
  ), 'd'), 'q'), 'k');
export const chain8EndpointRelationProof: Term = lambda(Nat, lambda(Chain8, lambda(Point2,
  pair(
    proof(transform(variable(2), first(variable(1)), variable(0))),
    proof(transform(variable(2), last(variable(1)), variable(0)))
  ), 'd'), 'q'), 'k');
