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
export const Chain9: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2))))))));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (k: Term, p: Term, d: Term): Term => app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const p1 = (q: Term): Term => fst(q);
const p2 = (q: Term): Term => fst(snd(q));
const p3 = (q: Term): Term => fst(snd(snd(q)));
const p4 = (q: Term): Term => fst(snd(snd(snd(q))));
const p5 = (q: Term): Term => fst(snd(snd(snd(snd(q)))));
const p6 = (q: Term): Term => fst(snd(snd(snd(snd(snd(q))))));
const p7 = (q: Term): Term => fst(snd(snd(snd(snd(snd(snd(q)))))));
const p8 = (q: Term): Term => fst(snd(snd(snd(snd(snd(snd(snd(q))))))));
const p9 = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(snd(q))))))));
const relation = (q: Term): Term => prod(app(app(onCircle, q), pair(q, app(normSq, q))), prod(app(app(onVerticalLine, q), fst(q)), app(app(incidence, q), pair(q, pair(one, zero)))));
const proof = (q: Term): Term => pair({ kind: 'Refl', type: Nat, value: app(normSq, q) }, pair({ kind: 'Refl', type: Nat, value: fst(q) }, { kind: 'Refl', type: Nat, value: fst(q) }));

/** Every transformed point in a nine-point chain carries the complete relation bundle. */
export const chain9RelationType: Term = pi(Nat, pi(Chain9, pi(Point2,
  prod(relation(transform(variable(2), p1(variable(1)), variable(0))),
    prod(relation(transform(variable(2), p2(variable(1)), variable(0))),
      prod(relation(transform(variable(2), p3(variable(1)), variable(0))),
        prod(relation(transform(variable(2), p4(variable(1)), variable(0))),
          prod(relation(transform(variable(2), p5(variable(1)), variable(0))),
            prod(relation(transform(variable(2), p6(variable(1)), variable(0))),
              prod(relation(transform(variable(2), p7(variable(1)), variable(0))),
                prod(relation(transform(variable(2), p8(variable(1)), variable(0))), relation(transform(variable(2), p9(variable(1)), variable(0))))))))))), 'd'), 'q'), 'k');
export const chain9RelationProof: Term = lambda(Nat, lambda(Chain9, lambda(Point2,
  pair(proof(transform(variable(2), p1(variable(1)), variable(0))),
    pair(proof(transform(variable(2), p2(variable(1)), variable(0))),
      pair(proof(transform(variable(2), p3(variable(1)), variable(0))),
        pair(proof(transform(variable(2), p4(variable(1)), variable(0))),
          pair(proof(transform(variable(2), p5(variable(1)), variable(0))),
            pair(proof(transform(variable(2), p6(variable(1)), variable(0))),
              pair(proof(transform(variable(2), p7(variable(1)), variable(0))),
                pair(proof(transform(variable(2), p8(variable(1)), variable(0))), proof(transform(variable(2), p9(variable(1)), variable(0))))))))))), 'd'), 'q'), 'k');
