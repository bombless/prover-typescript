import { Term, Nat, prod, pair, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { addVec2 } from './geometry-vectors';
import { rotate90 } from './geometry-rotations';
import { reflectX } from './geometry-reflections';
import { numeral } from './nat';

export const Vec2: Term = prod(Nat, Nat);

/** Coordinate swap distributes over vector addition. */
export const rotateAddType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(rotate90, app(app(addVec2, variable(1)), variable(0))),
    app(app(addVec2, app(rotate90, variable(1))), app(rotate90, variable(0)))), 'v'), 'u');
export const rotateAddProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Vec2, app(app(addVec2, app(rotate90, variable(1))), app(rotate90, variable(0)))), 'v'), 'u');

/** The current coordinate-copy reflection distributes over addition. */
export const reflectAddType: Term = pi(Vec2, pi(Vec2,
  eq(Vec2,
    app(reflectX, app(app(addVec2, variable(1)), variable(0))),
    app(app(addVec2, app(reflectX, variable(1))), app(reflectX, variable(0)))), 'v'), 'u');
export const reflectAddProof: Term = lambda(Vec2, lambda(Vec2,
  refl(Vec2, app(app(addVec2, variable(1)), variable(0))), 'v'), 'u');

/** A concrete rotated sum certificate. */
export const rotateAddConcreteType: Term = eq(Vec2,
  app(rotate90, app(app(addVec2, pair(numeral(1), numeral(4))), pair(numeral(2), numeral(3)))),
  pair(numeral(7), numeral(3)));
export const rotateAddConcreteProof: Term = refl(Vec2, pair(numeral(7), numeral(3)));

/** A concrete reflected sum certificate. */
export const reflectAddConcreteType: Term = eq(Vec2,
  app(reflectX, app(app(addVec2, pair(numeral(5), numeral(1))), pair(numeral(2), numeral(6)))),
  pair(numeral(7), numeral(7)));
export const reflectAddConcreteProof: Term = refl(Vec2, pair(numeral(7), numeral(7)));
