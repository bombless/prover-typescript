import { Term, Nat, prod, variable, pi, lambda, eq, refl, fst, snd } from '../syntax/ast';
import { Point2 } from './geometry-points';
export const Octagon2: Term = prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))));
export const firstVertexType: Term = pi(Octagon2, eq(Point2, fst(variable(0)), fst(variable(0))), 'o');
export const firstVertexProof: Term = lambda(Octagon2, refl(Point2, fst(variable(0))), 'o');
export const tailType: Term = pi(Octagon2, eq(prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))), snd(variable(0)), snd(variable(0))), 'o');
export const tailProof: Term = lambda(Octagon2, refl(prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, prod(Point2, Point2)))))), snd(variable(0))), 'o');
