import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Chain7 } from './geometry-seven-point-parametric-chain-relation-bundle-more';
export const Point2: Term = prod(Nat, Nat);
const p7=(q:Term)=>snd(snd(snd(snd(snd(snd(q))))));
export const seventhXType: Term = pi(Chain7, eq(Nat, fst(p7(variable(0))), fst(p7(variable(0)))), 'c');
export const seventhXProof: Term = lambda(Chain7,refl(Nat,fst(p7(variable(0)))),'c');
export const seventhYType: Term = pi(Chain7, eq(Nat, snd(p7(variable(0))), snd(p7(variable(0)))), 'c');
export const seventhYProof: Term = lambda(Chain7,refl(Nat,snd(p7(variable(0)))),'c');
