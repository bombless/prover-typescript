import { Term, Nat, prod, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';

export const Vec2: Term = prod(Nat, Nat);

/** The first coordinate of a scaled vector followed by a translation. */
export const scaleTranslateFstType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    fst(app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'v'), 'k');
export const scaleTranslateFstProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'v'), 'k');

/** The second coordinate of a scaled vector followed by a translation. */
export const scaleTranslateSndType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Nat,
    snd(app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'v'), 'k');
export const scaleTranslateSndProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'v'), 'k');

/** The full scaled and translated point is reconstructed coordinatewise. */
export const scaleTranslatePointType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0)),
    { kind: 'Pair',
      left: addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
      right: addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))) }), 'd'), 'v'), 'k');
export const scaleTranslatePointProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Vec2, { kind: 'Pair',
    left: addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))),
    right: addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))) }), 'd'), 'v'), 'k');
