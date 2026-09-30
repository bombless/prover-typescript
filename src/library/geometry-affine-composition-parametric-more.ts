import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);

/** Rotate after scale then translate: first coordinate formula. */
export const rotateScaleTranslateFstType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(rotate90, app(app(translate, app(app(scaleVec, variable(3)), variable(2))), variable(1)))),
    addTerm(mulTerm(variable(3), snd(variable(2))), snd(variable(1)))), 'd'), 'p'), 'k'), 'q');
export const rotateScaleTranslateFstProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(3), snd(variable(2))), snd(variable(1)))), 'd'), 'p'), 'k'), 'q');

/** Rotate after scale then translate: second coordinate formula. */
export const rotateScaleTranslateSndType: Term = pi(Nat, pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(rotate90, app(app(translate, app(app(scaleVec, variable(3)), variable(2))), variable(1)))),
    addTerm(mulTerm(variable(3), fst(variable(2))), fst(variable(1)))), 'd'), 'p'), 'k'), 'q');
export const rotateScaleTranslateSndProof: Term = lambda(Nat, lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(3), fst(variable(2))), fst(variable(1)))), 'd'), 'p'), 'k'), 'q');
