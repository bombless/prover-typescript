import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { translate } from './geometry-transform';
import { normSq, dot2 } from './geometry-metrics';
import { cross2 } from './geometry-cross';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);
const translated = (p: Term, d: Term): Term => app(app(translate, p), d);
const sum = (a: Term, b: Term): Term => addTerm(a, b);
const square = (a: Term): Term => mulTerm(a, a);

/** Translation expands the squared norm coordinatewise. */
export const translatedNormType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(normSq, translated(variable(1), variable(0))),
    sum(square(sum(fst(variable(1)), fst(variable(0)))), square(sum(snd(variable(1)), snd(variable(0)))))), 'd'), 'p');
export const translatedNormProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Nat, sum(square(sum(fst(variable(1)), fst(variable(0)))), square(sum(snd(variable(1)), snd(variable(0)))))), 'd'), 'p');

/** Translation expands the dot product against an arbitrary second vector. */
export const translatedDotType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(dot2, translated(variable(2), variable(1))), variable(0)),
    sum(mulTerm(sum(fst(variable(2)), fst(variable(1))), fst(variable(0))),
      mulTerm(sum(snd(variable(2)), snd(variable(1))), snd(variable(0))))), 'v'), 'd'), 'p');
export const translatedDotProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Nat, sum(mulTerm(sum(fst(variable(2)), fst(variable(1))), fst(variable(0))),
    mulTerm(sum(snd(variable(2)), snd(variable(1))), snd(variable(0))))), 'v'), 'd'), 'p');

/** Translation expands the simplified cross expression against an arbitrary vector. */
export const translatedCrossType: Term = pi(Vec2, pi(Vec2, pi(Vec2,
  eq(Nat, app(app(cross2, translated(variable(2), variable(1))), variable(0)),
    sum(mulTerm(sum(fst(variable(2)), fst(variable(1))), snd(variable(0))),
      mulTerm(sum(snd(variable(2)), snd(variable(1))), fst(variable(0))))), 'v'), 'd'), 'p');
export const translatedCrossProof: Term = lambda(Vec2, lambda(Vec2, lambda(Vec2,
  refl(Nat, sum(mulTerm(sum(fst(variable(2)), fst(variable(1))), snd(variable(0))),
    mulTerm(sum(snd(variable(2)), snd(variable(1))), fst(variable(0))))), 'v'), 'd'), 'p');
