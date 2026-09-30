import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);

/** Rotating a circle changes only its center slot in the structural representation. */
export const rotateCircleStructureType: Term = pi(Circle2,
  eq(Circle2, { kind: 'Pair', left: app(rotate90, fst(variable(0))), right: snd(variable(0)) },
    { kind: 'Pair', left: app(rotate90, fst(variable(0))), right: snd(variable(0)) }), 'c');
export const rotateCircleStructureProof: Term = lambda(Circle2,
  refl(Circle2, { kind: 'Pair', left: app(rotate90, fst(variable(0))), right: snd(variable(0)) }), 'c');

/** Translating a line changes only its base slot in the structural representation. */
export const translateLineStructureType: Term = pi(Point2, pi(Line2,
  eq(Line2, { kind: 'Pair', left: app(app(translate, fst(variable(0))), variable(1)), right: snd(variable(0)) },
    { kind: 'Pair', left: app(app(translate, fst(variable(0))), variable(1)), right: snd(variable(0)) }), 'l'), 'd');
export const translateLineStructureProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, { kind: 'Pair', left: app(app(translate, fst(variable(0))), variable(1)), right: snd(variable(0)) }), 'l'), 'd');

/** Rotating a line changes only its base slot while retaining direction. */
export const rotateLineStructureDirectionType: Term = pi(Line2,
  eq(Point2, snd({ kind: 'Pair', left: app(rotate90, fst(variable(0))), right: snd(variable(0)) }), snd(variable(0))), 'l');
export const rotateLineStructureDirectionProof: Term = lambda(Line2,
  refl(Point2, snd(variable(0))), 'l');
