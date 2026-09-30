import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);
const sx = (k: Term, u: Term): Term => mulTerm(k, fst(u));
const sy = (k: Term, u: Term): Term => mulTerm(k, snd(u));

export const scaleAddFirstCoordinateType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    sx(variable(2), pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'v'), 'u'), 'k');
export const scaleAddFirstCoordinateProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, sx(variable(2), pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'v'), 'u'), 'k');

export const scaleAddSecondCoordinateType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, snd(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    sy(variable(2), pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'v'), 'u'), 'k');
export const scaleAddSecondCoordinateProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, sy(variable(2), pair(addTerm(fst(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'v'), 'u'), 'k');
