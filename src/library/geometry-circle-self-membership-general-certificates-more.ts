import { Term, Nat, prod, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Circle2 } from './geometry-circle';
import { distanceSq } from './geometry-distance';

export const Point2: Term = prod(Nat, Nat);
export const Circle2Type: Term = prod(Point2, Nat);

/** In the current coordinate model, each point lies on its own circle with its computed radius square. */
export const pointSelfCircleType: Term = pi(Point2,
  eq(Nat, app(app(distanceSq, variable(0)), variable(0)),
    app(app(distanceSq, variable(0)), variable(0))), 'p');
export const pointSelfCircleProof: Term = lambda(Point2, refl(Nat, app(app(distanceSq, variable(0)), variable(0))), 'p');
