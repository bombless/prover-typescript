import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { normSq } from './geometry-metrics';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);

/** The norm-square of a translated vector unfolds coordinatewise. */
export const translatedNormFormulaType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(normSq, app(app(translate, variable(1)), variable(0))),
    addTerm(mulTerm(addTerm(fst(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), fst(variable(0)))),
      mulTerm(addTerm(snd(variable(1)), snd(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'd'), 'p');
export const translatedNormFormulaProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(addTerm(fst(variable(1)), fst(variable(0))), addTerm(fst(variable(1)), fst(variable(0)))),
    mulTerm(addTerm(snd(variable(1)), snd(variable(0))), addTerm(snd(variable(1)), snd(variable(0)))))), 'd'), 'p');

/** The norm-square of a scaled vector unfolds coordinatewise. */
export const scaledNormFormulaType: Term = pi(Nat, pi(Vec2,
  eq(Nat, app(normSq, app(app(scaleVec, variable(1)), variable(0))), scaledNormExpr()), 'v'), 'k');
export const scaledNormFormulaProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, scaledNormExpr()), 'v'), 'k');

function scaledNormExpr(): Term {
  const kx = mulTerm(variable(1), fst(variable(0)));
  const ky = mulTerm(variable(1), snd(variable(0)));
  return addTerm(mulTerm(kx, kx), mulTerm(ky, ky));
}
