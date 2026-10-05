import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { normSq } from './geometry-metrics';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Point2: Term = prod(Nat, Nat);

/** The norm formula after a quarter-turn and translation is exposed coordinatewise. */
export const rotateTranslateNormFormulaType: Term = pi(Point2, pi(Point2,
  eq(Nat,
    app(normSq, app(app(translate, app(rotate90, variable(1))), variable(0))),
    addTerm(
      mulTerm(addTerm(snd(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), fst(variable(0)))),
      mulTerm(addTerm(fst(variable(1)), snd(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))
    )), 'd'), 'p');

export const rotateTranslateNormFormulaProof: Term = lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(
    mulTerm(addTerm(snd(variable(1)), fst(variable(0))), addTerm(snd(variable(1)), fst(variable(0)))),
    mulTerm(addTerm(fst(variable(1)), snd(variable(0))), addTerm(fst(variable(1)), snd(variable(0))))
  )), 'd'), 'p');

/** Translation along the x-axis leaves the second output coordinate unchanged. */
export const xAxisTranslateSndType: Term = pi(Point2, pi(Nat,
  eq(Nat, snd(app(app(translate, variable(1)), pair(variable(0), { kind: 'Zero' }))), addTerm(snd(variable(1)), { kind: 'Zero' })), 'x'), 'p');
export const xAxisTranslateSndProof: Term = lambda(Point2, lambda(Nat,
  refl(Nat, addTerm(snd(variable(1)), { kind: 'Zero' })), 'x'), 'p');

/** Translation along the y-axis leaves the first output coordinate unchanged. */
export const yAxisTranslateFstType: Term = pi(Point2, pi(Nat,
  eq(Nat, fst(app(app(translate, variable(1)), pair({ kind: 'Zero' }, variable(0)))), addTerm(fst(variable(1)), { kind: 'Zero' })), 'y'), 'p');
export const yAxisTranslateFstProof: Term = lambda(Point2, lambda(Nat,
  refl(Nat, addTerm(fst(variable(1)), { kind: 'Zero' })), 'y'), 'p');
