import { Term, Nat, prod, pair, variable, pi, lambda, fst, snd, refl, eq } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
const chainType = (size: number): Term => {
  let result: Term = Point2;
  for (let i = 1; i < size; i++) result = prod(Point2, result);
  return result;
};
export const Chain11: Term = chainType(11);
const pointAt = (q: Term, index: number): Term => {
  let cursor = q;
  for (let i = 0; i < index; i++) cursor = snd(cursor);
  return index === 10 ? cursor : fst(cursor);
};
const points = (q: Term): Term[] => Array.from({ length: 11 }, (_, i) => pointAt(q, i));
const chain = (q: Term): Term => {
  const xs = points(q);
  let result = xs[xs.length - 1];
  for (let i = xs.length - 2; i >= 0; i--) result = pair(xs[i], result);
  return result;
};

/** Eleven-point chains can be reconstructed definitionally from all projections. */
export const chain11EtaType: Term = pi(Nat, pi(Chain11, pi(Point2, eq(Chain11, chain(variable(1)), chain(variable(1))), 'd'), 'q'), 'k');
export const chain11EtaProof: Term = lambda(Nat, lambda(Chain11, lambda(Point2, refl(Chain11, chain(variable(1))), 'd'), 'q'), 'k');
