import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);

/** The rotated first side is represented by the distance of the rotated endpoints. */
export const rotatedFirstSideMetricType: Term = pi(Triangle2,
  eq(Nat,
    app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0))))),
    app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0)))))), 't');
export const rotatedFirstSideMetricProof: Term = lambda(Triangle2,
  refl(Nat, app(app(distanceSq, app(rotate90, fst(variable(0)))), app(rotate90, fst(snd(variable(0)))))), 't');

/** Translating the second side endpoints produces a direct metric expression. */
export const translatedSecondSideMetricType: Term = pi(Point2, pi(Triangle2,
  eq(Nat,
    app(app(distanceSq, app(app(translate, fst(snd(variable(0)))), variable(1))),
      app(app(translate, snd(snd(variable(0)))), variable(1))),
    app(app(distanceSq, app(app(translate, fst(snd(variable(0)))), variable(1))),
      app(app(translate, snd(snd(variable(0)))), variable(1)))), 'd'), 't');
export const translatedSecondSideMetricProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Nat, app(app(distanceSq, app(app(translate, fst(snd(variable(0)))), variable(1))),
    app(app(translate, snd(snd(variable(0)))), variable(1)))), 'd'), 't');
