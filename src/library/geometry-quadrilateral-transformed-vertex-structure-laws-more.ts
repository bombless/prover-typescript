import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Quadrilateral2 } from './geometry-quadrilateral-four-stage-structure-laws-more';
import { rotate90 } from './geometry-rotations';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
const transform = (p: Term, d: Term): Term => app(app(translate, app(rotate90, p)), d);
const first = (q: Term): Term => fst(q);
const second = (q: Term): Term => fst(snd(q));
const third = (q: Term): Term => fst(snd(snd(q)));
const fourth = (q: Term): Term => snd(snd(snd(q)));
const transformed = (q: Term, d: Term): Term => pair(
  transform(first(q), d),
  pair(transform(second(q), d), pair(transform(third(q), d), transform(fourth(q), d)))
);

/** The second vertex of a transformed quadrilateral is the transformed second vertex. */
export const transformedQuadrilateralSecondType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Point2, fst(snd(transformed(variable(1), variable(0)))), transform(second(variable(1)), variable(0))), 'd'), 'q');
export const transformedQuadrilateralSecondProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Point2, transform(second(variable(1)), variable(0))), 'd'), 'q');

/** The third vertex of a transformed quadrilateral is the transformed third vertex. */
export const transformedQuadrilateralThirdType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Point2, fst(snd(snd(transformed(variable(1), variable(0))))), transform(third(variable(1)), variable(0))), 'd'), 'q');
export const transformedQuadrilateralThirdProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Point2, transform(third(variable(1)), variable(0))), 'd'), 'q');

/** All four transformed vertices reconstruct the transformed quadrilateral. */
export const transformedQuadrilateralVerticesEtaType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Quadrilateral2,
    pair(transform(first(variable(1)), variable(0)),
      pair(transform(second(variable(1)), variable(0)),
        pair(transform(third(variable(1)), variable(0)), transform(fourth(variable(1)), variable(0))))),
    transformed(variable(1), variable(0))), 'd'), 'q');
export const transformedQuadrilateralVerticesEtaProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Quadrilateral2, transformed(variable(1), variable(0))), 'd'), 'q');
