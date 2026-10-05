import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Pentagon2 } from './geometry-pentagon-parametric-structure-bundle-more';
import { reflectX } from './geometry-reflections';
export const Point2: Term = prod(Nat, Nat);
const fifth=(q:Term)=>snd(snd(snd(snd(q))));
export const fifthVertexReflectedYType: Term = pi(Pentagon2, eq(Nat, snd(app(reflectX,fifth(variable(0)))), snd(fifth(variable(0)))), 'p');
export const fifthVertexReflectedYProof: Term = lambda(Pentagon2,refl(Nat,snd(fifth(variable(0)))),'p');
