import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);

/** Coordinate law for translate(scale(p,k), d), before rotation. */
export const scaleTranslateType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Point2, app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0)),
    pair(addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
      addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))))), 'd'), 'p'), 'k');
export const scaleTranslateProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Point2, pair(addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
    addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))))), 'd'), 'p'), 'k');

/** Full coordinate law for reflect(rotate(p)). */
export const reflectRotateType: Term = pi(Point2,
  eq(Point2, app(reflectX, app(rotate90, variable(0))),
    pair(snd(variable(0)), fst(variable(0)))), 'p');
export const reflectRotateProof: Term = lambda(Point2,
  refl(Point2, pair(snd(variable(0)), fst(variable(0)))), 'p');
