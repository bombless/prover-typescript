import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Hexagon2 } from './geometry-hexagon-vertex-projection-bundle-more-2';
import { reflectX } from './geometry-reflections';
export const Point2: Term = prod(Nat, Nat);
const sixth=(q:Term)=>snd(snd(snd(snd(snd(q)))));
export const sixthVertexReflectedXType: Term = pi(Hexagon2, eq(Nat, fst(app(reflectX,sixth(variable(0)))), fst(sixth(variable(0)))), 'h');
export const sixthVertexReflectedXProof: Term = lambda(Hexagon2,refl(Nat,fst(sixth(variable(0)))),'h');
