import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Pentagon2 } from './geometry-pentagon-parametric-structure-bundle-more';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
export const Point2: Term = prod(Nat, Nat);
const fifth=(q:Term)=>snd(snd(snd(snd(q))));
export const fifthVertexTranslatedYType: Term = pi(Point2, pi(Pentagon2, eq(Nat, snd(app(app(translate,fifth(variable(0))),variable(1))), addTerm(snd(fifth(variable(0))),snd(variable(1)))), 'p'),'d');
export const fifthVertexTranslatedYProof: Term = lambda(Point2,lambda(Pentagon2,refl(Nat,addTerm(snd(fifth(variable(0))),snd(variable(1)))),'p'),'d');
