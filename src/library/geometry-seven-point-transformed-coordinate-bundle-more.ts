import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Chain7 } from './geometry-seven-point-parametric-chain-relation-bundle-more';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
const p7=(q:Term)=>snd(snd(snd(snd(snd(snd(q))))));
export const Point2: Term = prod(Nat, Nat);
export const seventhTranslatedXType: Term = pi(Point2, pi(Chain7, eq(Nat, fst(app(app(translate,p7(variable(0))),variable(1))), addTerm(fst(p7(variable(0))),fst(variable(1)))), 'c'),'d');
export const seventhTranslatedXProof: Term = lambda(Point2,lambda(Chain7,refl(Nat,addTerm(fst(p7(variable(0))),fst(variable(1)))),'c'),'d');
