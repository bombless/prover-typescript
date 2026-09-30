import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** In the discrete midpoint model, translating endpoints gives the expected pair of sums. */
export const translatedMidpointFstType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(app(midpoint,
      app(app(translate, variable(2)), variable(0))),
      app(app(translate, variable(1)), variable(0)))),
    addTerm(fst(variable(2)), fst(variable(0)))), 'd'), 'q'), 'p');
export const translatedMidpointFstProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(fst(variable(2)), fst(variable(0)))), 'd'), 'q'), 'p');

export const translatedMidpointSndType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(app(midpoint,
      app(app(translate, variable(2)), variable(0))),
      app(app(translate, variable(1)), variable(0)))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'q'), 'p');
export const translatedMidpointSndProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'q'), 'p');

/** Rotating a midpoint swaps its two coordinate projections. */
export const rotatedMidpointFstType: Term = pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(rotate90, app(app(midpoint, variable(1)), variable(0)))),
    snd(app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');
export const rotatedMidpointFstProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, snd(app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');

export const rotatedMidpointSndType: Term = pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(rotate90, app(app(midpoint, variable(1)), variable(0)))),
    fst(app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');
export const rotatedMidpointSndProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, fst(app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');
