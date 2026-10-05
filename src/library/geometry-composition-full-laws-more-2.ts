import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** Two successive scalings expose both output coordinates. */
export const scaleComposeFullType: Term = pi(Nat, pi(Nat, pi(Vec2,
  eq(Vec2,
    app(app(scaleVec, variable(2)), app(app(scaleVec, variable(1)), variable(0))),
    pair(
      mulTerm(variable(2), mulTerm(variable(1), fst(variable(0)))),
      mulTerm(variable(2), mulTerm(variable(1), snd(variable(0))))
    )), 'v'), 'k2'), 'k1');
export const scaleComposeFullProof: Term = lambda(Nat, lambda(Nat, lambda(Vec2,
  refl(Vec2, pair(
    mulTerm(variable(2), mulTerm(variable(1), fst(variable(0)))),
    mulTerm(variable(2), mulTerm(variable(1), snd(variable(0))))
  )), 'v'), 'k2'), 'k1');

/** Two successive translations expose both nested coordinate sums. */
export const translateComposeFullType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0)),
    pair(
      addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0))),
      addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))
    )), 'd2'), 'd1'), 'p');
export const translateComposeFullProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Vec2, pair(
    addTerm(addTerm(fst(variable(2)), fst(variable(1))), fst(variable(0))),
    addTerm(addTerm(snd(variable(2)), snd(variable(1))), snd(variable(0)))
  )), 'd2'), 'd1'), 'p');

/** Rotating a translated point swaps the two translated coordinates. */
export const rotateTranslateFullType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(rotate90, app(app(translate, variable(1)), variable(0))),
    pair(
      addTerm(snd(variable(1)), snd(variable(0))),
      addTerm(fst(variable(1)), fst(variable(0)))
    )), 'd'), 'p');
export const rotateTranslateFullProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Vec2, pair(
    addTerm(snd(variable(1)), snd(variable(0))),
    addTerm(fst(variable(1)), fst(variable(0)))
  )), 'd'), 'p');
