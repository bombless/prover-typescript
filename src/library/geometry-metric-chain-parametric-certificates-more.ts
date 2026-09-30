import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { normSq } from './geometry-metrics';
import { translate } from './geometry-transform';
import { scaleVec } from './geometry-scalar';
import { addTerm } from './nat';
import { mulTerm } from './mul';

export const Vec2: Term = prod(Nat, Nat);
const translatedExpr = (d: Term, p: Term): Term => addTerm(fst(d), fst(p));
const translatedExprY = (d: Term, p: Term): Term => addTerm(snd(d), snd(p));

export const translatedNormType: Term = pi(Vec2, pi(Vec2,
  eq(Nat, app(normSq, app(app(translate, variable(1)), variable(0))),
    addTerm(mulTerm(translatedExpr(variable(1), variable(0)), translatedExpr(variable(1), variable(0))),
      mulTerm(translatedExprY(variable(1), variable(0)), translatedExprY(variable(1), variable(0))))), 'd'), 'p');
export const translatedNormProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(translatedExpr(variable(1), variable(0)), translatedExpr(variable(1), variable(0))),
    mulTerm(translatedExprY(variable(1), variable(0)), translatedExprY(variable(1), variable(0))))), 'd'), 'p');

export const scaledNormType: Term = pi(Nat, pi(Vec2,
  eq(Nat, app(normSq, app(app(scaleVec, variable(1)), variable(0))),
    addTerm(mulTerm(mulTerm(variable(1), fst(variable(0))), mulTerm(variable(1), fst(variable(0)))),
      mulTerm(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), snd(variable(0)))))), 'v'), 'k');
export const scaledNormProof: Term = lambda(Nat, lambda(Vec2,
  refl(Nat, addTerm(mulTerm(mulTerm(variable(1), fst(variable(0))), mulTerm(variable(1), fst(variable(0)))),
    mulTerm(mulTerm(variable(1), snd(variable(0))), mulTerm(variable(1), snd(variable(0)))))), 'v'), 'k');
