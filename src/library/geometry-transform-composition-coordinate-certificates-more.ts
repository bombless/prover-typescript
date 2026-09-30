import { Term, Nat, prod, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);

const translated: Term = app(app(translate, variable(1)), variable(0));
const rotatedTranslated: Term = app(rotate90, translated);
const scaledRotated: Term = app(app(scaleVec, variable(1)), app(rotate90, variable(0)));
const scaledTranslated: Term = app(app(scaleVec, variable(2)), app(app(translate, variable(1)), variable(0)));

/** Rotation after translation exposes the translated y coordinate as x. */
export const rotateAfterTranslateFstType: Term = pi(Point2, pi(Point2,
  eq(Nat, fst(rotatedTranslated), addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const rotateAfterTranslateFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');

/** Rotation after translation exposes the translated x coordinate as y. */
export const rotateAfterTranslateSndType: Term = pi(Point2, pi(Point2,
  eq(Nat, snd(rotatedTranslated), addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const rotateAfterTranslateSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

/** Scaling after rotation multiplies the source y coordinate into x. */
export const scaleAfterRotateFstType: Term = pi(Nat, pi(Point2,
  eq(Nat, fst(scaledRotated), mulTerm(variable(1), snd(variable(0)))), 'p'), 'k');
export const scaleAfterRotateFstProof: Term = lambda(Nat,
  lambda(Point2, refl(Nat, mulTerm(variable(1), snd(variable(0)))), 'p'), 'k');

/** Scaling after rotation multiplies the source x coordinate into y. */
export const scaleAfterRotateSndType: Term = pi(Nat, pi(Point2,
  eq(Nat, snd(scaledRotated), mulTerm(variable(1), fst(variable(0)))), 'p'), 'k');
export const scaleAfterRotateSndProof: Term = lambda(Nat,
  lambda(Point2, refl(Nat, mulTerm(variable(1), fst(variable(0)))), 'p'), 'k');

/** Scaling after translation has the expected first-coordinate formula. */
export const scaleAfterTranslateFstType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, fst(scaledTranslated), mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p'), 'k');
export const scaleAfterTranslateFstProof: Term = lambda(Nat,
  lambda(Point2, lambda(Point2, refl(Nat, mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'd'), 'p'), 'k');

/** Scaling after translation has the expected second-coordinate formula. */
export const scaleAfterTranslateSndType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, snd(scaledTranslated), mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p'), 'k');
export const scaleAfterTranslateSndProof: Term = lambda(Nat,
  lambda(Point2, lambda(Point2, refl(Nat, mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'd'), 'p'), 'k');
