import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Line2 } from './geometry-line';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

const transformedLine = (d: Term, l: Term): Term => pair(
  app(rotate90, app(app(translate, fst(l)), d)),
  app(rotate90, snd(l))
);

/** Translate then rotate both the base point and direction of a line. */
export const compositeLineType: Term = pi(Point2, pi(Line2,
  eq(Line2, transformedLine(variable(1), variable(0)), transformedLine(variable(1), variable(0))), 'l'), 'd');
export const compositeLineProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, transformedLine(variable(1), variable(0))), 'l'), 'd');

export const compositeLineBaseType: Term = pi(Point2, pi(Line2,
  eq(Point2, fst(transformedLine(variable(1), variable(0))),
    app(rotate90, app(app(translate, fst(variable(0))), variable(1)))), 'l'), 'd');
export const compositeLineBaseProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, app(rotate90, app(app(translate, fst(variable(0))), variable(1)))), 'l'), 'd');

export const compositeLineDirectionType: Term = pi(Point2, pi(Line2,
  eq(Point2, snd(transformedLine(variable(1), variable(0))), app(rotate90, snd(variable(0)))), 'l'), 'd');
export const compositeLineDirectionProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, app(rotate90, snd(variable(0)))), 'l'), 'd');
