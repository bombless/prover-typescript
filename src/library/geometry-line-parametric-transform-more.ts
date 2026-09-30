import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Translating a line's base point exposes coordinate sums. */
export const translateLineBaseFstType: Term = pi(Point2, pi(Line2,
  eq(Nat, fst(app(app(translate, fst(variable(0))), variable(1))), addTerm(fst(fst(variable(0))), fst(variable(1)))), 'l'), 'd');
export const translateLineBaseFstProof: Term = lambda(Point2, lambda(Line2, refl(Nat, addTerm(fst(fst(variable(0))), fst(variable(1)))), 'l'), 'd');

export const translateLineBaseSndType: Term = pi(Point2, pi(Line2,
  eq(Nat, snd(app(app(translate, fst(variable(0))), variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), 'l'), 'd');
export const translateLineBaseSndProof: Term = lambda(Point2, lambda(Line2, refl(Nat, addTerm(snd(fst(variable(0))), snd(variable(1)))), 'l'), 'd');

/** Rotating a line's direction vector exposes swapped coordinates. */
export const rotateLineDirectionFstType: Term = pi(Line2,
  eq(Nat, fst(app(rotate90, snd(variable(0)))), snd(snd(variable(0)))), 'l');
export const rotateLineDirectionFstProof: Term = lambda(Line2, refl(Nat, snd(snd(variable(0)))), 'l');
export const rotateLineDirectionSndType: Term = pi(Line2,
  eq(Nat, snd(app(rotate90, snd(variable(0)))), fst(snd(variable(0)))), 'l');
export const rotateLineDirectionSndProof: Term = lambda(Line2, refl(Nat, fst(snd(variable(0)))), 'l');
