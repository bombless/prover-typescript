import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Chain11 } from './geometry-eleven-point-chain-eta-more';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
const p11=(q:Term)=>snd(snd(snd(snd(snd(snd(snd(snd(snd(snd(q))))))))));
export const Point2: Term = prod(Nat, Nat);
export const eleventhTranslatedYType: Term = pi(Point2, pi(Chain11, eq(Nat, snd(app(app(translate,p11(variable(0))),variable(1))), addTerm(snd(p11(variable(0))),snd(variable(1)))), 'c'),'d');
export const eleventhTranslatedYProof: Term = lambda(Point2,lambda(Chain11,refl(Nat,addTerm(snd(p11(variable(0))),snd(variable(1)))),'c'),'d');
