import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Scaling a vector sum has the expected first-coordinate expression. */
export const scaleAddFstType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    fst(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'v'), 'u'), 'k');
export const scaleAddFstProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), addTerm(fst(variable(1)), fst(variable(0))))), 'v'), 'u'), 'k');

/** Scaling a vector sum has the expected second-coordinate expression. */
export const scaleAddSndType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    snd(app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0)))),
    mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u'), 'k');
export const scaleAddSndProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), addTerm(snd(variable(1)), snd(variable(0))))), 'v'), 'u'), 'k');

/** Two successive scalings multiply the first coordinate successively. */
export const scaleComposeFstType: Term = pi(Nat, pi(Nat, pi(Vec2,
  eq(Nat,
    fst(app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0)))),
    mulTerm(variable(2), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k2'), 'k1');
export const scaleComposeFstProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), mulTerm(variable(1), fst(variable(0))))), 'v'), 'k2'), 'k1');

/** Two successive scalings multiply the second coordinate successively. */
export const scaleComposeSndType: Term = pi(Nat, pi(Nat, pi(Vec2,
  eq(Nat,
    snd(app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0)))),
    mulTerm(variable(2), mulTerm(variable(1), snd(variable(0))))), 'v'), 'k2'), 'k1');
export const scaleComposeSndProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2,
  refl(Nat, mulTerm(variable(2), mulTerm(variable(1), snd(variable(0))))), 'v'), 'k2'), 'k1');

/** Two successive translations have the expected first-coordinate expression. */
export const translateComposeFstType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Nat,
    fst(app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0))),
    addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0)))), 'd2'), 'd1'), 'p');
export const translateComposeFstProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0)))), 'd2'), 'd1'), 'p');

/** Two successive translations have the expected second-coordinate expression. */
export const translateComposeSndType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Nat,
    snd(app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0))),
    addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))), 'd2'), 'd1'), 'p');
export const translateComposeSndProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))), 'd2'), 'd1'), 'p');
