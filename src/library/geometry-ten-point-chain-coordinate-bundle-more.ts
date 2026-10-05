import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Chain10 } from './geometry-ten-point-chain-eta-more';
export const Point2: Term = prod(Nat, Nat);
const p10=(q:Term)=>snd(snd(snd(snd(snd(snd(snd(snd(snd(q)))))))));
export const tenthXType: Term = pi(Chain10, eq(Nat, fst(p10(variable(0))), fst(p10(variable(0)))), 'c');
export const tenthXProof: Term = lambda(Chain10,refl(Nat,fst(p10(variable(0)))),'c');
export const tenthYType: Term = pi(Chain10, eq(Nat, snd(p10(variable(0))), snd(p10(variable(0)))), 'c');
export const tenthYProof: Term = lambda(Chain10,refl(Nat,snd(p10(variable(0)))),'c');
