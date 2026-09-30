import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Coordinates of rotate90(translate(p,d)) for arbitrary points and displacement. */
export const rotateTranslateFstType: Term = pi(Point2, pi(Point2,
  eq(Nat,
    fst(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');
export const rotateTranslateFstProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(snd(variable(1)), snd(variable(0)))), 'd'), 'p');

export const rotateTranslateSndType: Term = pi(Point2, pi(Point2,
  eq(Nat,
    snd(app(rotate90, app(app(translate, variable(1)), variable(0)))),
    addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');
export const rotateTranslateSndProof: Term = lambda(Point2,
  lambda(Point2, refl(Nat, addTerm(fst(variable(1)), fst(variable(0)))), 'd'), 'p');

/** The composition is reconstructed from its two coordinate projections. */
export const rotateTranslateEtaType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    pair(
      fst(app(rotate90, app(app(translate, variable(1)), variable(0)))),
      snd(app(rotate90, app(app(translate, variable(1)), variable(0))))),
    app(rotate90, app(app(translate, variable(1)), variable(0)))), 'd'), 'p');
export const rotateTranslateEtaProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2, app(rotate90, app(app(translate, variable(1)), variable(0)))), 'd'), 'p');

/** Translating after rotation exposes the original coordinates explicitly. */
export const translateRotatePointType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    app(app(translate, app(rotate90, variable(1))), variable(0)),
    pair(addTerm(snd(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))), 'd'), 'p');
export const translateRotatePointProof: Term = lambda(Point2,
  lambda(Point2, refl(Point2,
    pair(addTerm(snd(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))), 'd'), 'p');
