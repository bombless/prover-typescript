import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { sub } from './sub';
import { mulTerm } from './mul';
import { addTerm } from './nat';
import { displacementSq } from './geometry-displacement';

export const Point2: Term = prod(Nat, Nat);

/** Displacement square unfolds to its coordinate formula. */
export const displacementFormulaType: Term = pi(Point2, pi(Point2,
  eq(Nat, app(app(displacementSq, variable(1)), variable(0)),
    addTerm(
      mulTerm(app(app(sub, fst(variable(1))), fst(variable(0))), app(app(sub, fst(variable(1))), fst(variable(0)))),
      mulTerm(app(app(sub, snd(variable(1))), snd(variable(0))), app(app(sub, snd(variable(1))), snd(variable(0))))
    )), 'q'), 'p');
export const displacementFormulaProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(
    mulTerm(app(app(sub, fst(variable(1))), fst(variable(0))), app(app(sub, fst(variable(1))), fst(variable(0)))),
    mulTerm(app(app(sub, snd(variable(1))), snd(variable(0))), app(app(sub, snd(variable(1))), snd(variable(0))))
  )), 'q'), 'p');

/** The zero point has zero displacement from every point in this model. */
export const displacementFromZeroType: Term = pi(Point2,
  eq(Nat, app(app(displacementSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)),
    addTerm(
      mulTerm(app(app(sub, { kind: 'Zero' }), fst(variable(0))), app(app(sub, { kind: 'Zero' }), fst(variable(0)))),
      mulTerm(app(app(sub, { kind: 'Zero' }), snd(variable(0))), app(app(sub, { kind: 'Zero' }), snd(variable(0))))
    )), 'p');
export const displacementFromZeroProof: Term = lambda(Point2, refl(Nat,
  addTerm(
    mulTerm(app(app(sub, { kind: 'Zero' }), fst(variable(0))), app(app(sub, { kind: 'Zero' }), fst(variable(0)))),
    mulTerm(app(app(sub, { kind: 'Zero' }), snd(variable(0))), app(app(sub, { kind: 'Zero' }), snd(variable(0))))
  )), 'p');
