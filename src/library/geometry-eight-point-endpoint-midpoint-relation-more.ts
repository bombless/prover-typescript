import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, refl } from '../syntax/ast';
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
export const Chain8: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(q)))))));
const midpointOf = (k: Term, q: Term, d: Term): Term => app(app(midpoint, transform(k, first(q), d)), transform(k, last(q), d));
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), pair(q, app(normSq, q))),
  prod(app(app(onVerticalLine, q), fst(q)), app(app(incidence, q), pair(q, pair(one, zero))))
);
const proof = (q: Term): Term => pair(refl(Nat, app(normSq, q)), pair(refl(Nat, fst(q)), refl(Nat, fst(q))));

/** The midpoint of the transformed endpoints carries a complete relation bundle. */
export const chain8EndpointMidpointRelationType: Term = pi(Nat, pi(Chain8, pi(Point2, relation(midpointOf(variable(2), variable(1), variable(0))), 'd'), 'q'), 'k');
export const chain8EndpointMidpointRelationProof: Term = lambda(Nat, lambda(Chain8, lambda(Point2, proof(midpointOf(variable(2), variable(1), variable(0))), 'd'), 'q'), 'k');
