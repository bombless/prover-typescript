import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Coordinate formula for adding a scaled vector on the left. */
export const scaledAddFstType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, fst(app(app(addVec2, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'v'), 'u'), 'k');
export const scaledAddFstProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'v'), 'u'), 'k');

/** Coordinate formula for adding a scaled vector on the left. */
export const scaledAddSndType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat, snd(app(app(addVec2, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'v'), 'u'), 'k');
export const scaledAddSndProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'v'), 'u'), 'k');
