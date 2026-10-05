import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { scaleVec } from './geometry-scalar';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { translate } from './geometry-transform';

export const Point2: Term = prod(Nat, Nat);
export const Quadrilateral2: Term = prod(Point2, prod(Point2, prod(Point2, Point2)));
const zero: Term = { kind: 'Zero' };
const one: Term = { kind: 'Succ', value: zero };
const transform = (p: Term, d: Term): Term =>
  app(app(translate, app(reflectX, app(rotate90, app(app(scaleVec, one), p)))), d);
const transformed = (q: Term, d: Term): Term => pair(
  transform(fst(q), d), pair(transform(fst(snd(q)), d), pair(transform(fst(snd(snd(q))), d), transform(snd(snd(snd(q))), d)))
);

/** A transformed quadrilateral is definitionally reconstructed from all four vertices. */
export const transformedQuadrilateralEtaType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Quadrilateral2,
    pair(fst(transformed(variable(1), variable(0))),
      pair(fst(snd(transformed(variable(1), variable(0)))),
        pair(fst(snd(snd(transformed(variable(1), variable(0))))), snd(snd(snd(transformed(variable(1), variable(0)))))))),
    transformed(variable(1), variable(0))), 'd'), 'q');
export const transformedQuadrilateralEtaProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Quadrilateral2, transformed(variable(1), variable(0))), 'd'), 'q');

export const transformedQuadrilateralFirstType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Point2, fst(transformed(variable(1), variable(0))), transform(fst(variable(1)), variable(0))), 'd'), 'q');
export const transformedQuadrilateralFirstProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Point2, transform(fst(variable(1)), variable(0))), 'd'), 'q');

export const transformedQuadrilateralFourthType: Term = pi(Quadrilateral2, pi(Point2,
  eq(Point2, snd(snd(snd(transformed(variable(1), variable(0))))), transform(snd(snd(snd(variable(1)))), variable(0))), 'd'), 'q');
export const transformedQuadrilateralFourthProof: Term = lambda(Quadrilateral2, lambda(Point2,
  refl(Point2, transform(snd(snd(snd(variable(1)))), variable(0))), 'd'), 'q');
