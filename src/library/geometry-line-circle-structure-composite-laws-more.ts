import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

export const translatedLineFullType: Term = pi(Point2, pi(Line2,
  eq(Line2,
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0))),
    pair(pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), snd(variable(0)))), 'l'), 'd');
export const translatedLineFullProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1)))), snd(variable(0)))), 'l'), 'd');

export const rotatedCircleFullType: Term = pi(Circle2,
  eq(Circle2, pair(app(rotate90, fst(variable(0))), snd(variable(0))),
    pair(pair(snd(fst(variable(0))), fst(fst(variable(0)))), snd(variable(0)))), 'c');
export const rotatedCircleFullProof: Term = lambda(Circle2,
  refl(Circle2, pair(pair(snd(fst(variable(0))), fst(fst(variable(0)))), snd(variable(0)))), 'c');
