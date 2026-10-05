import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Chain11 } from './geometry-eleven-point-chain-eta-more';
export const Point2: Term = prod(Nat, Nat);
const p11=(q:Term)=>snd(snd(snd(snd(snd(snd(snd(snd(snd(snd(q))))))))));
export const eleventhXType: Term = pi(Chain11, eq(Nat, fst(p11(variable(0))), fst(p11(variable(0)))), 'c');
export const eleventhXProof: Term = lambda(Chain11,refl(Nat,fst(p11(variable(0)))),'c');
export const eleventhYType: Term = pi(Chain11, eq(Nat, snd(p11(variable(0))), snd(p11(variable(0)))), 'c');
export const eleventhYProof: Term = lambda(Chain11,refl(Nat,snd(p11(variable(0)))),'c');
