import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { normSq, dot2 } from './geometry-metrics';
import { mulTerm, } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);
const normSwapped = (v: Term): Term => addTerm(mulTerm(snd(v), snd(v)), mulTerm(fst(v), fst(v)));
const normOriginal = (v: Term): Term => addTerm(mulTerm(fst(v), fst(v)), mulTerm(snd(v), snd(v)));

export const rotatedNormType: Term = pi(Vec2,
  eq(Nat, app(normSq, app(rotate90, variable(0))), normSwapped(variable(0))), 'v');
export const rotatedNormProof: Term = lambda(Vec2,
  refl(Nat, normSwapped(variable(0))), 'v');

export const reflectedNormType: Term = pi(Vec2,
  eq(Nat, app(normSq, app(reflectX, variable(0))), normOriginal(variable(0))), 'v');
export const reflectedNormProof: Term = lambda(Vec2,
  refl(Nat, normOriginal(variable(0))), 'v');

export const rotatedSelfDotType: Term = pi(Vec2,
  eq(Nat, app(app(dot2, app(rotate90, variable(0))), app(rotate90, variable(0))), normSwapped(variable(0))), 'v');
export const rotatedSelfDotProof: Term = lambda(Vec2,
  refl(Nat, normSwapped(variable(0))), 'v');
