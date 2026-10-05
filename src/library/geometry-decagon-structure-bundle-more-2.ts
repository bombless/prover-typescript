import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Point2 } from './geometry-points';
export const Decagon2: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))));
export const firstVertexType: Term = pi(Decagon2, eq(Point2, fst(variable(0)), fst(variable(0))), 'd');
export const firstVertexProof: Term = lambda(Decagon2, refl(Point2, fst(variable(0))), 'd');
const Tail=prod(Point2,prod(Point2,prod(Point2,prod(Point2,Point2))));
export const tailType: Term = pi(Decagon2, eq(Tail, snd(variable(0)), snd(variable(0))), 'd');
export const tailProof: Term = lambda(Decagon2, refl(Tail, snd(variable(0))), 'd');
