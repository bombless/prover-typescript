import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { distanceSq } from './geometry-distance';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);

/** All three triangle-side distance expressions are structurally available. */
export const side12Type: Term = pi(Triangle2, eq(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0)))), app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');
export const side12Proof: Term = lambda(Triangle2, refl(Nat, app(app(distanceSq, fst(variable(0))), fst(snd(variable(0))))), 't');
export const side23Type: Term = pi(Triangle2, eq(Nat, app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0)))), app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');
export const side23Proof: Term = lambda(Triangle2, refl(Nat, app(app(distanceSq, fst(snd(variable(0)))), snd(snd(variable(0))))), 't');
export const side13Type: Term = pi(Triangle2, eq(Nat, app(app(distanceSq, fst(variable(0))), snd(snd(variable(0)))), app(app(distanceSq, fst(variable(0))), snd(snd(variable(0))))), 't');
export const side13Proof: Term = lambda(Triangle2, refl(Nat, app(app(distanceSq, fst(variable(0))), snd(snd(variable(0))))), 't');

/** Translating both endpoints preserves a directly expressible side metric. */
export const translatedSide12Type: Term = pi(Point2, pi(Triangle2, eq(Nat,
  app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))), app(app(translate, fst(snd(variable(0)))), variable(1))),
  app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))), app(app(translate, fst(snd(variable(0)))), variable(1)))), 't'), 'd');
export const translatedSide12Proof: Term = lambda(Point2, lambda(Triangle2, refl(Nat, app(app(distanceSq, app(app(translate, fst(variable(0))), variable(1))), app(app(translate, fst(snd(variable(0)))), variable(1)))), 't'), 'd');
