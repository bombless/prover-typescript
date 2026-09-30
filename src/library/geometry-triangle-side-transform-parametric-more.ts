import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';
import { addTerm } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Rotating the second vertex exposes both coordinates for side construction. */
export const rotatedSecondFstType: Term = pi(Triangle2,
  eq(Nat, fst(app(rotate90, fst(snd(variable(0))))), snd(fst(snd(variable(0))))), 't');
export const rotatedSecondFstProof: Term = lambda(Triangle2, refl(Nat, snd(fst(snd(variable(0))))), 't');
export const rotatedSecondSndType: Term = pi(Triangle2,
  eq(Nat, snd(app(rotate90, fst(snd(variable(0))))), fst(fst(snd(variable(0))))), 't');
export const rotatedSecondSndProof: Term = lambda(Triangle2, refl(Nat, fst(fst(snd(variable(0))))), 't');

/** Translating both endpoints of the first side yields an explicit metric expression. */
export const translatedFirstSideType: Term = pi(Point2, pi(Triangle2,
  eq(Nat,
    app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))),
      app(app(translate, fst(snd(variable(0)))), variable(1))),
    app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))),
      app(app(translate, fst(snd(variable(0)))), variable(1)))), 't'), 'd');
export const translatedFirstSideProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))),
    app(app(translate, fst(snd(variable(0)))), variable(1)))), 't'), 'd');

/** The translated third vertex coordinates are explicit sums. */
export const translatedThirdFstType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, fst(app(app(translate, snd(snd(variable(0)))), variable(1))),
    addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 't'), 'd');
export const translatedThirdFstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(fst(snd(snd(variable(0)))), fst(variable(1)))), 't'), 'd');

export const translatedThirdSndType: Term = pi(Point2, pi(Triangle2,
  eq(Nat, snd(app(app(translate, snd(snd(variable(0)))), variable(1))),
    addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 't'), 'd');
export const translatedThirdSndProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, addTerm(snd(snd(snd(variable(0)))), snd(variable(1)))), 't'), 'd');
