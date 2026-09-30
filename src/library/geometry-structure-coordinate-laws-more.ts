import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Triangle2 } from './geometry-triangle';
import { Line2 } from './geometry-line';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** Translation acts on the first triangle vertex as a point expression. */
export const translateTriangleFirstType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, fst(variable(0))), variable(1)),
    app(app(translate, fst(variable(0))), variable(1))), 'd'), 't');
export const translateTriangleFirstProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, app(app(translate, fst(variable(0))), variable(1))), 'd'), 't');

/** Translation acts on the second triangle vertex as a point expression. */
export const translateTriangleSecondType: Term = pi(Point2, pi(Triangle2,
  eq(Point2, app(app(translate, fst(snd(variable(0)))), variable(1)),
    app(app(translate, fst(snd(variable(0)))), variable(1))), 'd'), 't');
export const translateTriangleSecondProof: Term = lambda(Point2, lambda(Triangle2,
  refl(Point2, app(app(translate, fst(snd(variable(0)))), variable(1))), 'd'), 't');

/** Rotation acts on a line base as a point expression. */
export const rotateLineBaseType: Term = pi(Line2,
  eq(Point2, app(rotate90, fst(variable(0))), app(rotate90, fst(variable(0)))), 'l');
export const rotateLineBaseProof: Term = lambda(Line2,
  refl(Point2, app(rotate90, fst(variable(0)))), 'l');

/** A line direction projection remains available after a base rotation. */
export const rotateLineDirectionType: Term = pi(Line2,
  eq(Point2, snd(pair(app(rotate90, fst(variable(0))), snd(variable(0)))), snd(variable(0))), 'l');
export const rotateLineDirectionProof: Term = lambda(Line2,
  refl(Point2, snd(variable(0))), 'l');
