import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { numeral } from './nat';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle';

export const Point2: Term = prod(Nat, Nat);

export const translatedPairType: Term = pi(Point2, pi(Point2,
  eq(Point2, pair(fst(app(app(translate, variable(1)), variable(0))), snd(app(app(translate, variable(1)), variable(0)))), app(app(translate, variable(1)), variable(0))), 'd'), 'p');
export const translatedPairProof: Term = lambda(Point2, lambda(Point2, refl(Point2, app(app(translate, variable(1)), variable(0))), 'd'), 'p');

export const rotatedPairType: Term = pi(Point2, eq(Point2, pair(fst(app(rotate90, variable(0))), snd(app(rotate90, variable(0)))), app(rotate90, variable(0))), 'p');
export const rotatedPairProof: Term = lambda(Point2, refl(Point2, app(rotate90, variable(0))), 'p');

const triangle: Term = pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
const circle: Term = pair(pair(numeral(3), numeral(4)), numeral(5));

export const triangleTailTransformType: Term = eq(Point2, app(rotate90, snd(snd(triangle))), pair(numeral(6), numeral(5)));
export const triangleTailTransformProof: Term = refl(Point2, pair(numeral(6), numeral(5)));
export const circleCenterTransformType: Term = eq(Point2, app(rotate90, fst(circle)), pair(numeral(4), numeral(3)));
export const circleCenterTransformProof: Term = refl(Point2, pair(numeral(4), numeral(3)));

export const triangleEtaMoreType: Term = pi(Triangle2, eq(Triangle2, pair(fst(variable(0)), pair(fst(snd(variable(0))), snd(snd(variable(0))))), variable(0)), 't');
export const triangleEtaMoreProof: Term = lambda(Triangle2, refl(Triangle2, variable(0)), 't');
export const circleEtaMoreType: Term = pi(Circle2, eq(Circle2, pair(fst(variable(0)), snd(variable(0))), variable(0)), 'c');
export const circleEtaMoreProof: Term = lambda(Circle2, refl(Circle2, variable(0)), 'c');
