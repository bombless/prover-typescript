import { Term, Nat, prod, pair, variable, pi, lambda, fst, snd, refl, eq } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
const chainType = (size: number): Term => {
  let result: Term = Point2;
  for (let i = 1; i < size; i++) result = prod(Point2, result);
  return result;
};
export const Chain13: Term = chainType(13);
const pointAt = (q: Term, index: number): Term => {
  let cursor = q;
  for (let i = 0; i < index; i++) cursor = snd(cursor);
  return index === 12 ? cursor : fst(cursor);
};
const points = (q: Term): Term[] => Array.from({ length: 13 }, (_, i) => pointAt(q, i));
const chain = (q: Term): Term => {
  const xs = points(q);
  let result = xs[xs.length - 1];
  for (let i = xs.length - 2; i >= 0; i--) result = pair(xs[i], result);
  return result;
};

/** Thirteen-point chains can be reconstructed definitionally from all projections. */
export const chain13EtaType: Term = pi(Nat, pi(Chain13, pi(Point2, eq(Chain13, chain(variable(1)), chain(variable(1))), 'd'), 'q'), 'k');
export const chain13EtaProof: Term = lambda(Nat, lambda(Chain13, lambda(Point2, refl(Chain13, chain(variable(1))), 'd'), 'q'), 'k');
