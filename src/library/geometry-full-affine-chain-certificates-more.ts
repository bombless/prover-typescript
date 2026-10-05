import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';
import { reflectX } from './geometry-reflections';
import { addTerm } from './nat';
import { mulTerm } from './mul';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);

/** Full point formula for scale, rotate, translate, then reflect. */
export const affineChainPointType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Point2,
    app(reflectX, app(app(translate, app(rotate90, app(app(scaleVec, variable(2)), variable(1)))), variable(0))),
    pair(
      addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0))),
      addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0))))), 'd'), 'p'), 'k');
export const affineChainPointProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Point2, pair(
    addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0))),
    addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0))))), 'd'), 'p'), 'k');

/** The first coordinate of the full affine chain. */
export const affineChainFstType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, fst(app(reflectX, app(app(translate, app(rotate90, app(app(scaleVec, variable(2)), variable(1)))), variable(0)))),
    addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');
export const affineChainFstProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), snd(variable(1))), fst(variable(0)))), 'd'), 'p'), 'k');

/** The second coordinate of the full affine chain. */
export const affineChainSndType: Term = pi(Nat, pi(Point2, pi(Point2,
  eq(Nat, snd(app(reflectX, app(app(translate, app(rotate90, app(app(scaleVec, variable(2)), variable(1)))), variable(0)))),
    addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');
export const affineChainSndProof: Term = lambda(Nat, lambda(Point2, lambda(Point2,
  refl(Nat, addTerm(mulTerm(variable(2), fst(variable(1))), snd(variable(0)))), 'd'), 'p'), 'k');

/** Closed affine-chain computation. */
export const affineChainConcreteType: Term = eq(Point2,
  app(reflectX,
    app(
      app(translate, app(rotate90, app(app(scaleVec, numeral(2)), pair(numeral(3), numeral(2))))),
      pair(numeral(1), numeral(3))
    )),
  pair(numeral(5), numeral(9)));
export const affineChainConcreteProof: Term = refl(Point2,
  pair(numeral(5), numeral(9)));
