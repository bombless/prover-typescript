import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, { kind: 'Succ', value: { kind: 'Zero' } }), p)))), d);
const transformedTriangle = (t: Term, d: Term): Term => pair(
  transform(fst(t), d),
  pair(transform(fst(snd(t)), d), transform(snd(snd(t)), d))
);

/** A transformed triangle is reconstructed from its three transformed vertices. */
export const transformedTriangleEtaType: Term = pi(Triangle2, pi(Point2,
  eq(Triangle2,
    pair(fst(transformedTriangle(variable(1), variable(0))),
      pair(fst(snd(transformedTriangle(variable(1), variable(0)))), snd(snd(transformedTriangle(variable(1), variable(0)))))),
    transformedTriangle(variable(1), variable(0))), 'd'), 't');
export const transformedTriangleEtaProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Triangle2, transformedTriangle(variable(1), variable(0))), 'd'), 't');

/** The first transformed vertex is exactly the four-stage point transform of the original first vertex. */
export const transformedTriangleFirstType: Term = pi(Triangle2, pi(Point2,
  eq(Point2, fst(transformedTriangle(variable(1), variable(0))), transform(fst(variable(1)), variable(0))), 'd'), 't');
export const transformedTriangleFirstProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Point2, transform(fst(variable(1)), variable(0))), 'd'), 't');

/** The second transformed vertex is exactly the point transform of the original second vertex. */
export const transformedTriangleSecondType: Term = pi(Triangle2, pi(Point2,
  eq(Point2, fst(snd(transformedTriangle(variable(1), variable(0)))), transform(fst(snd(variable(1))), variable(0))), 'd'), 't');
export const transformedTriangleSecondProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Point2, transform(fst(snd(variable(1))), variable(0))), 'd'), 't');

/** The third transformed vertex is exactly the point transform of the original third vertex. */
export const transformedTriangleThirdType: Term = pi(Triangle2, pi(Point2,
  eq(Point2, snd(snd(transformedTriangle(variable(1), variable(0)))), transform(snd(snd(variable(1))), variable(0))), 'd'), 't');
export const transformedTriangleThirdProof: Term = lambda(Triangle2, lambda(Point2,
  refl(Point2, transform(snd(snd(variable(1))), variable(0))), 'd'), 't');
