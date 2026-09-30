import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** A rotated line preserves its direction slot while transforming its base. */
export const rotateLineStructureType: Term = pi(Line2,
  eq(Line2, pair(app(rotate90, fst(variable(0))), snd(variable(0))),
    pair(app(rotate90, fst(variable(0))), snd(variable(0)))), 'l');
export const rotateLineStructureProof: Term = lambda(Line2,
  refl(Line2, pair(app(rotate90, fst(variable(0))), snd(variable(0)))), 'l');

/** Translating a line preserves its direction slot. */
export const translateLineStructureType: Term = pi(Point2, pi(Line2,
  eq(Line2, pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0))),
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'l'), 'd');
export const translateLineStructureProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'l'), 'd');

/** The first coordinate of a translated line base is a sum. */
export const translateLineBaseFirstCoordinateType: Term = pi(Point2, pi(Line2,
  eq(Nat, fst(app(app(translate, fst(variable(0))), variable(1))),
    addTerm(fst(fst(variable(0))), fst(variable(1)))), 'l'), 'd');
export const translateLineBaseFirstCoordinateProof: Term = lambda(Point2, lambda(Line2,
  refl(Nat, addTerm(fst(fst(variable(0))), fst(variable(1)))), 'l'), 'd');
