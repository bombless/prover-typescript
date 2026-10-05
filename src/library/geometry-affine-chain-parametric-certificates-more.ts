import { Term, Nat, prod, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { fst, snd } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);

/** The complete rotate(scale(p,k)+d) chain has an explicit coordinate formula. */
export const rotateScaleTranslatePointType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Point2,
    app(rotate90, app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0))),
    { kind: 'Pair',
      left: addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))),
      right: addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))) }), 'd'), 'p'), 'k');
export const rotateScaleTranslatePointProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Point2, { kind: 'Pair',
    left: addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0))),
    right: addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0))) }), 'd'), 'p'), 'k');

/** Reflection after translation preserves the coordinate pair in this model. */
export const reflectTranslatePointType: Term = pi(Point2, pi(Point2,
  eq(Point2,
    app(reflectX, app(app(translate, variable(1)), variable(0))),
    app(app(translate, variable(1)), variable(0))), 'd'), 'p');
export const reflectTranslatePointProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, app(app(translate, variable(1)), variable(0))), 'd'), 'p');

/** The full rotate-scale-translate chain exposes each output coordinate. */
export const rotateScaleTranslateFstType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, fst(app(rotate90, app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0)))),
    addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');
export const rotateScaleTranslateFstProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');

export const rotateScaleTranslateSndType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, snd(app(rotate90, app(app(translate, app(app(scaleVec, variable(2)), variable(1))), variable(0)))),
    addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');
export const rotateScaleTranslateSndProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');
