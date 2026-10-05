import { Term, Nat, prod, pair, variable, pi, lambda, app, fst, snd, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { normSq } from './geometry-metrics';
import { onCircle } from './geometry-circle';
import { onVerticalLine } from './geometry-line';
import { incidence } from './geometry-incidence';

export const Point2: Term = prod(Nat, Nat);
export const Chain6: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const p1 = (q: Term): Term => fst(q);
const p2 = (q: Term): Term => fst(snd(q));
const p3 = (q: Term): Term => fst(snd(snd(q)));
const p4 = (q: Term): Term => fst(snd(snd(snd(q))));
const p5 = (q: Term): Term => fst(snd(snd(snd(snd(q)))));
const p6 = (q: Term): Term => snd(snd(snd(snd(snd(q)))));
const relation = (q: Term): Term => prod(app(app(onCircle, q), pair(q, app(normSq, q))), prod(app(app(onVerticalLine, q), fst(q)), app(app(incidence, q), pair(q, pair(one, zero)))));
const proof = (q: Term): Term => pair(refl(Nat, app(normSq, q)), pair(refl(Nat, fst(q)), refl(Nat, fst(q))));

/** Six transformed chain points can be individually projected and related. */
export const chainRelationType: Term = pi(Nat, pi(Chain6, pi(Point2,
  prod(relation(transform(variable(2), p1(variable(1)), variable(0))),
    prod(relation(transform(variable(2), p3(variable(1)), variable(0))), relation(transform(variable(2), p6(variable(1)), variable(0))))),
  'd'), 'q'), 'k');
export const chainRelationProof: Term = lambda(Nat, lambda(Chain6, lambda(Point2,
  pair(proof(transform(variable(2), p1(variable(1)), variable(0))), pair(proof(transform(variable(2), p3(variable(1)), variable(0))), proof(transform(variable(2), p6(variable(1)), variable(0))))),
  'd'), 'q'), 'k');

/** The chain's final projection is definitionally its sixth point. */
export const chainLastType: Term = pi(Chain6, eq(Point2, p6(variable(0)), p6(variable(0))), 'q');
export const chainLastProof: Term = lambda(Chain6, refl(Point2, p6(variable(0))), 'q');

/** Every point in the six-point chain carries a self-circle, vertical-line, and incidence bundle. */
export const chainAllRelationType: Term = pi(Nat, pi(Chain6, pi(Point2,
  prod(
    relation(transform(variable(2), p1(variable(1)), variable(0))),
    prod(relation(transform(variable(2), p2(variable(1)), variable(0))),
      prod(relation(transform(variable(2), p3(variable(1)), variable(0))),
        prod(relation(transform(variable(2), p4(variable(1)), variable(0))),
          prod(relation(transform(variable(2), p5(variable(1)), variable(0))), relation(transform(variable(2), p6(variable(1)), variable(0))))))
    )
  ), 'd'), 'q'), 'k');
export const chainAllRelationProof: Term = lambda(Nat, lambda(Chain6, lambda(Point2,
  pair(proof(transform(variable(2), p1(variable(1)), variable(0))),
    pair(proof(transform(variable(2), p2(variable(1)), variable(0))),
      pair(proof(transform(variable(2), p3(variable(1)), variable(0))),
        pair(proof(transform(variable(2), p4(variable(1)), variable(0))),
          pair(proof(transform(variable(2), p5(variable(1)), variable(0))), proof(transform(variable(2), p6(variable(1)), variable(0)))))))
  ), 'd'), 'q'), 'k');
