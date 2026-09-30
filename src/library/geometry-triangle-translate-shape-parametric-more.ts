import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd, pair } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
const translatedTriangle: Term = pair(
  app(app(translate, fst(variable(0))), variable(1)),
  pair(app(app(translate, fst(snd(variable(0)))), variable(1)), app(app(translate, snd(snd(variable(0)))), variable(1)))
);

/** Translating every vertex preserves the triangle's nested product shape. */
export const translateTriangleShapeType: Term = pi(Point2, pi(Triangle2,
  eq(Triangle2, translatedTriangle, translatedTriangle), 't'), 'd');
export const translateTriangleShapeProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Triangle2, translatedTriangle), 't'), 'd');

/** The translated triangle's first vertex remains directly accessible. */
export const translateTriangleFirstVertexType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)), app(app(translate, fst(variable(0))), variable(1))), 't'), 'd');
export const translateTriangleFirstVertexProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, app(app(translate, fst(variable(0))), variable(1))), 't'), 'd');
