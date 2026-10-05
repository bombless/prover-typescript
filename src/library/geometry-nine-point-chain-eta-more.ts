import { Term, Nat, prod, pair, variable, pi, lambda, fst, snd, refl, eq } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
export const Chain9: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2))))))));
const p1 = (q: Term): Term => fst(q);
const p2 = (q: Term): Term => fst(snd(q));
const p3 = (q: Term): Term => fst(snd(snd(q)));
const p4 = (q: Term): Term => fst(snd(snd(snd(q))));
const p5 = (q: Term): Term => fst(snd(snd(snd(snd(q)))));
const p6 = (q: Term): Term => fst(snd(snd(snd(snd(snd(q))))));
const p7 = (q: Term): Term => fst(snd(snd(snd(snd(snd(snd(q)))))));
const p8 = (q: Term): Term => fst(snd(snd(snd(snd(snd(snd(snd(q))))))));
const p9 = (q: Term): Term => snd(snd(snd(snd(snd(snd(snd(snd(q))))))));
const chain = (q: Term): Term => pair(p1(q), pair(p2(q), pair(p3(q), pair(p4(q), pair(p5(q), pair(p6(q), pair(p7(q), pair(p8(q), p9(q)))))))));

/** Nine-point chains can be reconstructed definitionally from all projections. */
export const chain9EtaType: Term = pi(Nat, pi(Chain9, pi(Point2, eq(Chain9, chain(variable(1)), chain(variable(1))), 'd'), 'q'), 'k');
export const chain9EtaProof: Term = lambda(Nat, lambda(Chain9, lambda(Point2, refl(Chain9, chain(variable(1))), 'd'), 'q'), 'k');
