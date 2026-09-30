import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { distanceSq } from './geometry-distance';
import { numeral } from './nat';

export const Point2: Term = prod(Nat, Nat);
export const Triangle2: Term = prod(Point2, prod(Point2, Point2));
export const triangleOrigin: Term = pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair({ kind: 'Zero' }, { kind: 'Zero' })));
export const triangleOriginType: Term = Triangle2;
export const triangleOriginProof: Term = triangleOrigin;

/** A degenerate triangle certificate: all three vertices are the origin. */
export const degenerateTriangleType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const degenerateTriangleProof: Term = refl(Nat, { kind: 'Zero' });

/** The origin triangle has each vertex equal to the origin point. */
export const triangleOriginVertexType: Term = eq(Point2,
  fst(triangleOrigin), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const triangleOriginVertexProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

export const triangleOriginSecondVertexType: Term = eq(Point2,
  fst(snd(triangleOrigin)), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const triangleOriginSecondVertexProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

export const triangleOriginThirdVertexType: Term = eq(Point2,
  snd(snd(triangleOrigin)), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const triangleOriginThirdVertexProof: Term = refl(Point2, pair({ kind: 'Zero' }, { kind: 'Zero' }));

/** A triangle's first vertex is definitionally its first component. */
export const triangleFirstVertexType: Term = pi(Triangle2, eq(Point2,
  fst(variable(0)), fst(variable(0))), 't');
export const triangleFirstVertexProof: Term = lambda(Triangle2, refl(Point2, fst(variable(0))), 't');

/** A triangle's second vertex is the first component of its tail pair. */
export const triangleSecondVertexType: Term = pi(Triangle2, eq(Point2,
  fst(snd(variable(0))), fst(snd(variable(0)))), 't');
export const triangleSecondVertexProof: Term = lambda(Triangle2, refl(Point2, fst(snd(variable(0)))), 't');

/** A triangle's third vertex is the second component of its tail pair. */
export const triangleThirdVertexType: Term = pi(Triangle2, eq(Point2,
  snd(snd(variable(0))), snd(snd(variable(0)))), 't');
export const triangleThirdVertexProof: Term = lambda(Triangle2, refl(Point2, snd(snd(variable(0)))), 't');

/** A triangle is reconstructed from its three vertices. */
export const triangleEtaType: Term = pi(Triangle2,
  eq(Triangle2,
    pair(fst(variable(0)), pair(fst(snd(variable(0))), snd(snd(variable(0))))),
    variable(0)), 't');
export const triangleEtaProof: Term = lambda(Triangle2, refl(Triangle2, variable(0)), 't');

/** The nested tail pair of a triangle is reconstructed from its last two vertices. */
export const triangleTailEtaType: Term = pi(Triangle2,
  eq(prod(Point2, Point2),
    pair(fst(snd(variable(0))), snd(snd(variable(0)))), snd(variable(0))), 't');
export const triangleTailEtaProof: Term = lambda(Triangle2, refl(prod(Point2, Point2), snd(variable(0))), 't');

export const triangleConcreteType: Term = eq(Triangle2,
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))),
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))));
export const triangleConcreteProof: Term = refl(Triangle2,
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))));

export const triangleConcreteFirstVertexType: Term = eq(Point2,
  fst(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))))),
  pair(numeral(1), numeral(2)));
export const triangleConcreteFirstVertexProof: Term = refl(Point2, pair(numeral(1), numeral(2)));
export const triangleConcreteSecondVertexType: Term = eq(Point2,
  fst(snd(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))))),
  pair(numeral(3), numeral(4)));
export const triangleConcreteSecondVertexProof: Term = refl(Point2, pair(numeral(3), numeral(4)));
export const triangleConcreteThirdVertexType: Term = eq(Point2,
  snd(snd(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))))),
  pair(numeral(5), numeral(6)));
export const triangleConcreteThirdVertexProof: Term = refl(Point2, pair(numeral(5), numeral(6)));
export const triangleConcreteTailType: Term = eq(prod(Point2, Point2),
  snd(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))))),
  pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
export const triangleConcreteTailProof: Term = refl(prod(Point2, Point2), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))));
export const triangleConcreteEtaType: Term = eq(Triangle2,
  pair(fst(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6))))),
    pair(fst(snd(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))))),
      snd(snd(pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))))))),
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))));
export const triangleConcreteEtaProof: Term = refl(Triangle2,
  pair(pair(numeral(1), numeral(2)), pair(pair(numeral(3), numeral(4)), pair(numeral(5), numeral(6)))));
