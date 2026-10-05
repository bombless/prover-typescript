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
export const Chain9: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2))))))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const p1 = (q: Term): Term => fst(q);
const p9 = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(snd(q))))))));
const relation = (x: Term): Term => prod(app(app(onCircle, x), pair(x, app(normSq, x))), prod(app(app(onVerticalLine, x), fst(x)), app(app(incidence, x), pair(x, pair(one, zero)))));
const proof = (x: Term): Term => pair(refl(Nat, app(normSq, x)), pair(refl(Nat, fst(x)), refl(Nat, fst(x))));

/** First and last points of a transformed nine-point chain carry relation bundles. */
export const chain9EndpointRelationType: Term = pi(Nat, pi(Chain9, pi(Point2, prod(relation(transform(variable(2), p1(variable(1)), variable(0))), relation(transform(variable(2), p9(variable(1)), variable(0)))), 'd'), 'q'), 'k');
export const chain9EndpointRelationProof: Term = lambda(Nat, lambda(Chain9, lambda(Point2, pair(proof(transform(variable(2), p1(variable(1)), variable(0))), proof(transform(variable(2), p9(variable(1)), variable(0)))), 'd'), 'q'), 'k');
