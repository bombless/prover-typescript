import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';
import { Line2 } from './geometry-line';

export const Point2: Term = prod(Nat, Nat);

/** Translating a line transforms its base point coordinatewise and preserves direction. */
export const translateLineBaseType: Term = pi(Point2, pi(Line2,
  eq(Point2,
    app(app(translate, fst(variable(0))), variable(1)),
    pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'd'), 'l');
export const translateLineBaseProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, pair(addTerm(fst(fst(variable(0))), fst(variable(1))), addTerm(snd(fst(variable(0))), snd(variable(1))))), 'd'), 'l');

export const translateLineDirectionType: Term = pi(Point2, pi(Line2,
  eq(Point2, snd(variable(0)), snd(variable(0))), 'd'), 'l');
export const translateLineDirectionProof: Term = lambda(Point2, lambda(Line2,
  refl(Point2, snd(variable(0))), 'd'), 'l');

/** Rotating a line transforms its base and direction by the same coordinate swap. */
export const rotateLineBaseType: Term = pi(Line2,
  eq(Point2, app(rotate90, fst(variable(0))),
    pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'l');
export const rotateLineBaseProof: Term = lambda(Line2,
  refl(Point2, pair(snd(fst(variable(0))), fst(fst(variable(0))))), 'l');

export const rotateLineDirectionType: Term = pi(Line2,
  eq(Point2, app(rotate90, snd(variable(0))),
    pair(snd(snd(variable(0))), fst(snd(variable(0))))), 'l');
export const rotateLineDirectionProof: Term = lambda(Line2,
  refl(Point2, pair(snd(snd(variable(0))), fst(snd(variable(0))))), 'l');

/** A transformed line is reconstructed from its transformed base and direction. */
export const transformedLineEtaType: Term = pi(Point2, pi(Line2,
  eq(Line2,
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0))),
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'd'), 'l');
export const transformedLineEtaProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'd'), 'l');
