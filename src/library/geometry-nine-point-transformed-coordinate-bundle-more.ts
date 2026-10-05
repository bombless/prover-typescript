import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Chain9 } from './geometry-nine-point-chain-eta-more';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
const p9=(q:Term)=>snd(snd(snd(snd(snd(snd(snd(snd(q))))))));
export const Point2: Term = prod(Nat, Nat);
export const ninthTranslatedXType: Term = pi(Point2, pi(Chain9, eq(Nat, fst(app(app(translate,p9(variable(0))),variable(1))), addTerm(fst(p9(variable(0))),fst(variable(1)))), 'c'),'d');
export const ninthTranslatedXProof: Term = lambda(Point2,lambda(Chain9,refl(Nat,addTerm(fst(p9(variable(0))),fst(variable(1)))),'c'),'d');
