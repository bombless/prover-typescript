import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);
const transform = (k: Term, p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, k), p)))), d);
const tx = (k: Term, p: Term, d: Term): Term => addTerm(fst(d), mulTerm(k, snd(p)));
const ty = (k: Term, p: Term, d: Term): Term => addTerm(snd(d), mulTerm(k, fst(p)));

/** The four-stage pipeline has an explicit first-coordinate formula. */
export const transformFstType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, fst(transform(variable(2), variable(1), variable(0))),
    addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');
export const transformFstProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');

/** The four-stage pipeline has an explicit second-coordinate formula. */
export const transformSndType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, snd(transform(variable(2), variable(1), variable(0))),
    addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');
export const transformSndProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');

/** The transformed point is reconstructed from its two coordinate laws. */
export const transformEtaType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Point2, pair(fst(transform(variable(2), variable(1), variable(0))),
      snd(transform(variable(2), variable(1), variable(0)))),
    transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
export const transformEtaProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Point2, transform(variable(2), variable(1), variable(0))), 'd'), 'p'), 'k');
