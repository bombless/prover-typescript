import { Term, Nat, prod, pair, variable, pi, lambda, fst, snd, refl, eq } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
const chainType = (size: number): Term => {
  let result: Term = Point2;
  for (let i = 1; i < size; i++) result = prod(Point2, result);
  return result;
};
const pointAt = (q: Term, index: number, last: number): Term => {
  let cursor = q;
  for (let i = 0; i < index; i++) cursor = snd(cursor);
  return index === last ? cursor : fst(cursor);
};
const chainOf = (q: Term, size: number): Term => {
  const xs: Term[] = Array.from({ length: size }, (_, i) => pointAt(q, i, size - 1));
  let result = xs[xs.length - 1];
  for (let i = xs.length - 2; i >= 0; i--) result = pair(xs[i], result);
  return result;
};

export const Chain14: Term = chainType(14);
export const chain14EtaType: Term = pi(Nat, pi(Chain14, pi(Point2, eq(Chain14, chainOf(variable(1), 14), chainOf(variable(1), 14)), 'd'), 'q'), 'k');
export const chain14EtaProof: Term = lambda(Nat, lambda(Chain14, lambda(Point2, refl(Chain14, chainOf(variable(1), 14)), 'd'), 'q'), 'k');

export const Chain15: Term = chainType(15);
export const chain15VertexProjectionType: Term = pi(Chain15, eq(Point2, pointAt(variable(0), 14, 14), pointAt(variable(0), 14, 14)), 'q');
export const chain15VertexProjectionProof: Term = lambda(Chain15, refl(Point2, pointAt(variable(0), 14, 14)), 'q');
export const chain15EtaType: Term = pi(Nat, pi(Chain15, pi(Point2, eq(Chain15, chainOf(variable(1), 15), chainOf(variable(1), 15)), 'd'), 'q'), 'k');
export const chain15EtaProof: Term = lambda(Nat, lambda(Chain15, lambda(Point2, refl(Chain15, chainOf(variable(1), 15)), 'd'), 'q'), 'k');

export const Chain16: Term = chainType(16);
export const chain16EtaType: Term = pi(Nat, pi(Chain16, pi(Point2, eq(Chain16, chainOf(variable(1), 16), chainOf(variable(1), 16)), 'd'), 'q'), 'k');
export const chain16EtaProof: Term = lambda(Nat, lambda(Chain16, lambda(Point2, refl(Chain16, chainOf(variable(1), 16)), 'd'), 'q'), 'k');

export const Chain17: Term = chainType(17);
export const chain17EtaType: Term = pi(Nat, pi(Chain17, pi(Point2, eq(Chain17, chainOf(variable(1), 17), chainOf(variable(1), 17)), 'd'), 'q'), 'k');
export const chain17EtaProof: Term = lambda(Nat, lambda(Chain17, lambda(Point2, refl(Chain17, chainOf(variable(1), 17)), 'd'), 'q'), 'k');

export const Chain18: Term = chainType(18);
export const chain18EtaType: Term = pi(Nat, pi(Chain18, pi(Point2, eq(Chain18, chainOf(variable(1), 18), chainOf(variable(1), 18)), 'd'), 'q'), 'k');
export const chain18EtaProof: Term = lambda(Nat, lambda(Chain18, lambda(Point2, refl(Chain18, chainOf(variable(1), 18)), 'd'), 'q'), 'k');

export const Chain19: Term = chainType(19);
export const chain19EtaType: Term = pi(Nat, pi(Chain19, pi(Point2, eq(Chain19, chainOf(variable(1), 19), chainOf(variable(1), 19)), 'd'), 'q'), 'k');
export const chain19EtaProof: Term = lambda(Nat, lambda(Chain19, lambda(Point2, refl(Chain19, chainOf(variable(1), 19)), 'd'), 'q'), 'k');

export const Chain20: Term = chainType(20);
export const chain20EtaType: Term = pi(Nat, pi(Chain20, pi(Point2, eq(Chain20, chainOf(variable(1), 20), chainOf(variable(1), 20)), 'd'), 'q'), 'k');
export const chain20EtaProof: Term = lambda(Nat, lambda(Chain20, lambda(Point2, refl(Chain20, chainOf(variable(1), 20)), 'd'), 'q'), 'k');

const etaType = (chain: Term, size: number): Term => pi(Nat, pi(chain, pi(Point2, eq(chain, chainOf(variable(1), size), chainOf(variable(1), size)), 'd'), 'q'), 'k');
const etaProof = (chain: Term, size: number): Term => lambda(Nat, lambda(chain, lambda(Point2, refl(chain, chainOf(variable(1), size)), 'd'), 'q'), 'k');
export const Chain21: Term = chainType(21); export const chain21EtaType = etaType(Chain21, 21); export const chain21EtaProof = etaProof(Chain21, 21);
export const Chain22: Term = chainType(22); export const chain22EtaType = etaType(Chain22, 22); export const chain22EtaProof = etaProof(Chain22, 22);
export const Chain23: Term = chainType(23); export const chain23EtaType = etaType(Chain23, 23); export const chain23EtaProof = etaProof(Chain23, 23);
export const Chain24: Term = chainType(24); export const chain24EtaType = etaType(Chain24, 24); export const chain24EtaProof = etaProof(Chain24, 24);
export const Chain25: Term = chainType(25); export const chain25EtaType = etaType(Chain25, 25); export const chain25EtaProof = etaProof(Chain25, 25);
export const Chain26: Term = chainType(26); export const chain26EtaType = etaType(Chain26, 26); export const chain26EtaProof = etaProof(Chain26, 26);
export const Chain27: Term = chainType(27); export const chain27EtaType = etaType(Chain27, 27); export const chain27EtaProof = etaProof(Chain27, 27);
export const Chain28: Term = chainType(28); export const chain28EtaType = etaType(Chain28, 28); export const chain28EtaProof = etaProof(Chain28, 28);
export const Chain29: Term = chainType(29); export const chain29EtaType = etaType(Chain29, 29); export const chain29EtaProof = etaProof(Chain29, 29);
export const Chain30: Term = chainType(30); export const chain30EtaType = etaType(Chain30, 30); export const chain30EtaProof = etaProof(Chain30, 30);
