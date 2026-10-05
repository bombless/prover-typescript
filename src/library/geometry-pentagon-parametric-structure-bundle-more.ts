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
export const Pentagon2: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const first = (q: Term): Term => fst(q);
const last = (q: Term): Term => snd(snd(snd(snd(q))));
const relation = (q: Term): Term => prod(
  app(app(onCircle, q), pair(q, app(normSq, q))),
  prod(app(app(onVerticalLine, q), fst(q)), app(app(incidence, q), pair(q, pair(one, zero))))
);
const relationProof = (q: Term): Term => pair(refl(Nat, app(normSq, q)), pair(refl(Nat, fst(q)), refl(Nat, fst(q))));

/** A transformed pentagon is reconstructed from all five transformed vertices. */
export const pentagonEtaType: Term = pi(Nat, pi(Pentagon2, pi(Point2,
  eq(Pentagon2,
    pair(transform(variable(2), first(variable(1)), variable(0)),
      pair(transform(variable(2), fst(snd(variable(1))), variable(0)),
        pair(transform(variable(2), fst(snd(snd(variable(1)))), variable(0)),
          pair(transform(variable(2), fst(snd(snd(snd(variable(1))))), variable(0)), transform(variable(2), last(variable(1)), variable(0)))))),
    pair(transform(variable(2), first(variable(1)), variable(0)),
      pair(transform(variable(2), fst(snd(variable(1))), variable(0)),
        pair(transform(variable(2), fst(snd(snd(variable(1)))), variable(0)),
          pair(transform(variable(2), fst(snd(snd(snd(variable(1))))), variable(0)), transform(variable(2), last(variable(1)), variable(0))))))), 'd'), 'q'), 'k');
export const pentagonEtaProof: Term = lambda(Nat, lambda(Pentagon2, lambda(Point2,
  refl(Pentagon2, pair(transform(variable(2), first(variable(1)), variable(0)), pair(transform(variable(2), fst(snd(variable(1))), variable(0)), pair(transform(variable(2), fst(snd(snd(variable(1)))), variable(0)), pair(transform(variable(2), fst(snd(snd(snd(variable(1))))), variable(0)), transform(variable(2), last(variable(1)), variable(0))))))), 'd'), 'q'), 'k');

/** The first and last transformed pentagon vertices carry self-relation bundles. */
export const pentagonEndRelationType: Term = pi(Nat, pi(Pentagon2, pi(Point2,
  prod(relation(transform(variable(2), first(variable(1)), variable(0))), relation(transform(variable(2), last(variable(1)), variable(0)))), 'd'), 'q'), 'k');
export const pentagonEndRelationProof: Term = lambda(Nat, lambda(Pentagon2, lambda(Point2,
  pair(relationProof(transform(variable(2), first(variable(1)), variable(0))), relationProof(transform(variable(2), last(variable(1)), variable(0)))), 'd'), 'q'), 'k');

const second = (q: Term): Term => fst(snd(q));
const third = (q: Term): Term => fst(snd(snd(q)));
const fourth = (q: Term): Term => fst(snd(snd(snd(q))));

/** All five transformed pentagon vertices carry the complete relation bundle. */
export const pentagonAllRelationType: Term = pi(Nat, pi(Pentagon2, pi(Point2,
  prod(
    relation(transform(variable(2), first(variable(1)), variable(0))),
    prod(relation(transform(variable(2), second(variable(1)), variable(0))),
      prod(relation(transform(variable(2), third(variable(1)), variable(0))),
        prod(relation(transform(variable(2), fourth(variable(1)), variable(0))), relation(transform(variable(2), last(variable(1)), variable(0)))))
    )
  ), 'd'), 'q'), 'k');
export const pentagonAllRelationProof: Term = lambda(Nat, lambda(Pentagon2, lambda(Point2,
  pair(relationProof(transform(variable(2), first(variable(1)), variable(0))),
    pair(relationProof(transform(variable(2), second(variable(1)), variable(0))),
      pair(relationProof(transform(variable(2), third(variable(1)), variable(0))),
        pair(relationProof(transform(variable(2), fourth(variable(1)), variable(0))), relationProof(transform(variable(2), last(variable(1)), variable(0))))))
  ), 'd'), 'q'), 'k');
