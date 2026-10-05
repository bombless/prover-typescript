import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Hexagon2 } from './geometry-hexagon-vertex-projection-bundle-more-2';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
export const Point2: Term = prod(Nat, Nat);
const sixth=(q:Term)=>snd(snd(snd(snd(snd(q)))));
export const sixthVertexTranslatedXType: Term = pi(Point2, pi(Hexagon2, eq(Nat, fst(app(app(translate,sixth(variable(0))),variable(1))), addTerm(fst(sixth(variable(0))),fst(variable(1)))), 'h'),'d');
export const sixthVertexTranslatedXProof: Term = lambda(Point2,lambda(Hexagon2,refl(Nat,addTerm(fst(sixth(variable(0))),fst(variable(1)))),'h'),'d');
