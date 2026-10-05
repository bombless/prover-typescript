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
import { Chain10, Point2 } from './geometry-ten-point-chain-eta-more';
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => { let c = q; for (let i = 0; i < 9; i++) c = snd(c); return c; };
const mid = (k: Term, q: Term, d: Term): Term => app(app(midpoint, transform(k, first(q), d)), transform(k, last(q), d));
const relation = (x: Term): Term => prod(app(app(onCircle, x), pair(x, app(normSq, x))), prod(app(app(onVerticalLine, x), fst(x)), app(app(incidence, x), pair(x, pair(one, zero)))));
const proof = (x: Term): Term => pair(refl(Nat, app(normSq, x)), pair(refl(Nat, fst(x)), refl(Nat, fst(x))));

/** The midpoint of the transformed ten-point chain endpoints carries a relation bundle. */
export const chain10EndpointMidpointRelationType: Term = pi(Nat, pi(Chain10, pi(Point2, relation(mid(variable(2), variable(1), variable(0))), 'd'), 'q'), 'k');
export const chain10EndpointMidpointRelationProof: Term = lambda(Nat, lambda(Chain10, lambda(Point2, proof(mid(variable(2), variable(1), variable(0))), 'd'), 'q'), 'k');
