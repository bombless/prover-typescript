import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { mulTerm } from './mul';
import { addTerm } from './nat';

export const Vec2: Term = prod(Nat, Nat);

const scaled = (k: Term, v: Term): Term => app(app(scaleVec, k), v);
const rotated = (k: Term, v: Term): Term => app(rotate90, scaled(k, v));
const reflected = (k: Term, v: Term): Term => app(reflectX, rotated(k, v));
const translated = (k: Term, v: Term, d: Term): Term => app(app(translate, reflected(k, v)), d);

/** All four coordinates of the scale/rotate/reflect/translate pipeline. */
const coordinateBundle = (k: Term, v: Term, d: Term): Term =>
  prod(
    eq(Nat, fst(scaled(k, v)), mulTerm(k, fst(v))),
    prod(
      eq(Nat, snd(scaled(k, v)), mulTerm(k, snd(v))),
      prod(
        eq(Nat, fst(rotated(k, v)), mulTerm(k, snd(v))),
        prod(
          eq(Nat, snd(rotated(k, v)), mulTerm(k, fst(v))),
          prod(
            eq(Nat, fst(translated(k, v, d)), addTerm(mulTerm(k, snd(v)), fst(d))),
            eq(Nat, snd(translated(k, v, d)), addTerm(mulTerm(k, fst(v)), snd(d))))))));
export const transformCoordinateBundleType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  coordinateBundle(variable(2), variable(1), variable(0)), 'd'), 'v'), 'k');

export const transformCoordinateBundleProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  pair(
    refl(Nat, mulTerm(variable(2), fst(variable(1)))),
    pair(
      refl(Nat, mulTerm(variable(2), snd(variable(1)))),
      pair(
        refl(Nat, mulTerm(variable(2), snd(variable(1)))),
        pair(
          refl(Nat, mulTerm(variable(2), fst(variable(1)))),
          pair(
            refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0)))),
            refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0))))))))), 'd'), 'v'), 'k');

/** The final point is reconstructed from its two translated coordinates. */
export const transformedPointEtaType: Term = pi(Nat, pi(Vec2, pi(Vec2,
  eq(Vec2,
    pair(fst(translated(variable(2), variable(1), variable(0))), snd(translated(variable(2), variable(1), variable(0)))),
    translated(variable(2), variable(1), variable(0))), 'd'), 'v'), 'k');
export const transformedPointEtaProof: Term = lambda(Nat, lambda(Vec2, lambda(Vec2,
  refl(Vec2, translated(variable(2), variable(1), variable(0))), 'd'), 'v'), 'k');
