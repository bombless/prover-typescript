import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Circle2 } from './geometry-circle-laws';
import { Line2 } from './geometry-line';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
const rotatedTriangle: Term = pair(
  app(rotate90, fst(variable(0))),
  pair(app(rotate90, fst(snd(variable(0)))), app(rotate90, snd(snd(variable(0))))),
);

/** The rotated triangle is reconstructed from the three transformed vertices. */
export const rotateTriangleEtaType: Term = pi(Triangle2,
  eq(Triangle2, rotatedTriangle, rotatedTriangle), 't');
export const rotateTriangleEtaProof: Term = lambda(Triangle2, refl(Triangle2,
  rotatedTriangle), 't');

/** The reflected circle is reconstructed from transformed center and unchanged radius. */
export const reflectCircleEtaType: Term = pi(Circle2,
  eq(Circle2, pair(app(reflectX, fst(variable(0))), snd(variable(0))),
    pair(app(reflectX, fst(variable(0))), snd(variable(0)))), 'c');
export const reflectCircleEtaProof: Term = lambda(Circle2,
  refl(Circle2, pair(app(reflectX, fst(variable(0))), snd(variable(0)))), 'c');

/** The translated line is reconstructed from translated base and original direction. */
export const translateLineEtaType: Term = pi(Point2, pi(Line2,
  eq(Line2, pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0))),
    pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'l'), 'd');
export const translateLineEtaProof: Term = lambda(Point2, lambda(Line2,
  refl(Line2, pair(app(app(translate, fst(variable(0))), variable(1)), snd(variable(0)))), 'l'), 'd');
