import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Point2 } from './geometry-triangle';
import { midpoint } from './geometry-segment';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

/** A transformed midpoint remains a concrete midpoint expression after rotation. */
export const rotatedMidpointShapeType: Term = pi(Point2, pi(Point2,
  eq(Point2, app(rotate90, app(app(midpoint, variable(1)), variable(0))),
    app(rotate90, app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');
export const rotatedMidpointShapeProof: Term = lambda(Point2, lambda(Point2,
  refl(Point2, app(rotate90, app(app(midpoint, variable(1)), variable(0)))), 'q'), 'p');

/** A translated midpoint has a direct structural coordinate expression. */
export const translatedMidpointShapeType: Term = pi(Point2, pi(Point2, pi(Point2,
  eq(Point2, app(app(translate, app(app(midpoint, variable(2)), variable(1))), variable(0)),
    app(app(translate, app(app(midpoint, variable(2)), variable(1))), variable(0))), 'd'), 'q'), 'p');
export const translatedMidpointShapeProof: Term = lambda(Point2, lambda(Point2, lambda(Point2,
  refl(Point2, app(app(translate, app(app(midpoint, variable(2)), variable(1))), variable(0))), 'd'), 'q'), 'p');
