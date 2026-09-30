import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);
const sx = (k: Term, u: Term, v: Term): Term => mulTerm(k, addTerm(fst(u), fst(v)));
const sy = (k: Term, u: Term, v: Term): Term => mulTerm(k, addTerm(snd(u), snd(v)));
const tx = (d2: Term, d1: Term, p: Term): Term => addTerm(addTerm(fst(d2), fst(d1)), fst(p));
const ty = (d2: Term, d1: Term, p: Term): Term => addTerm(addTerm(snd(d2), snd(d1)), snd(p));

export const scaleAddPointType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Vec2, app(app(scaleVec, variable(2)), app(app(addVec2, variable(1)), variable(0))),
    pair(sx(variable(2), variable(1), variable(0)), sy(variable(2), variable(1), variable(0)))), 'v'), 'u'), 'k');
export const scaleAddPointProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Vec2, pair(sx(variable(2), variable(1), variable(0)), sy(variable(2), variable(1), variable(0)))), 'v'), 'u'), 'k');

export const translateComposePointType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Vec2, app(app(translate, app(app(translate, variable(2)), variable(1))), variable(0)),
    pair(tx(variable(2), variable(1), variable(0)), ty(variable(2), variable(1), variable(0)))), 'd2'), 'd1'), 'p');
export const translateComposePointProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Vec2, pair(tx(variable(2), variable(1), variable(0)), ty(variable(2), variable(1), variable(0)))), 'd2'), 'd1'), 'p');
