import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);
const tx = (d: Term, p: Term): Term => addTerm(fst(d), fst(p));
const ty = (d: Term, p: Term): Term => addTerm(snd(d), snd(p));

export const translatedDistanceType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Nat,
    app(app(distanceSq, app(app(translate, variable(2)), variable(0))), app(app(translate, variable(2)), variable(1))),
    addTerm(mulTerm(tx(variable(2), variable(0)), tx(variable(2), variable(1))), mulTerm(ty(variable(2), variable(0)), ty(variable(2), variable(1))))), 'q'), 'p'), 'd');
export const translatedDistanceProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(tx(variable(2), variable(0)), tx(variable(2), variable(1))), mulTerm(ty(variable(2), variable(0)), ty(variable(2), variable(1))))), 'q'), 'p'), 'd');

export const rotatedDistanceType: Term = pi(Point2, pi(Point2,
  eq(Nat, app(app(distanceSq, app(rotate90, variable(1))), app(rotate90, variable(0))),
    addTerm(mulTerm(snd(variable(1)), snd(variable(0))), mulTerm(fst(variable(1)), fst(variable(0))))), 'q'), 'p');
export const rotatedDistanceProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(snd(variable(1)), snd(variable(0))), mulTerm(fst(variable(1)), fst(variable(0))))), 'q'), 'p');
