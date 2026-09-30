import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Point2 } from './geometry-triangle';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const translatedMidpointType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Point2,
    app(app(translate, app(app(midpoint, variable(2)), variable(1))), variable(0)),
    pair(addTerm(fst(variable(2)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'q'), 'p');
export const translatedMidpointProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Point2, pair(addTerm(fst(variable(2)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'q'), 'p');

export const rotatedMidpointType: Term = pi(Point2, pi(Point2,
  eq(Point2, app(rotate90, app(app(midpoint, variable(1)), variable(0))),
    pair(snd(variable(0)), fst(variable(1)))), 'q'), 'p');
export const rotatedMidpointProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, pair(snd(variable(0)), fst(variable(1)))), 'q'), 'p');
