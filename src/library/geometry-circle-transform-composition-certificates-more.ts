import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { Circle2 } from './geometry-circle-laws';
import { translate } from './geometry-transform';
import { rotate90 } from './geometry-rotations';

export const Point2: Term = prod(Nat, Nat);

/** A translated circle followed by the coordinate-swap rotation. */
const transformedCircle = (d: Term, c: Term): Term => pair(
  app(rotate90, app(app(translate, fst(c)), d)),
  snd(c)
);

/** The composite transform sends a circle center through both point maps. */
export const compositeCircleCenterType: Term = pi(Point2, pi(Circle2,
  eq(Point2, fst(transformedCircle(variable(1), variable(0))),
    app(rotate90, app(app(translate, fst(variable(0))), variable(1)))), 'c'), 'd');
export const compositeCircleCenterProof: Term = lambda(Point2, lambda(Circle2,
  refl(Point2, app(rotate90, app(app(translate, fst(variable(0))), variable(1)))), 'c'), 'd');

/** Translation and rotation leave the circle radius component unchanged. */
export const compositeCircleRadiusType: Term = pi(Point2, pi(Circle2,
  eq(Nat, snd(transformedCircle(variable(1), variable(0))), snd(variable(0))), 'c'), 'd');
export const compositeCircleRadiusProof: Term = lambda(Point2, lambda(Circle2,
  refl(Nat, snd(variable(0))), 'c'), 'd');

/** The composite circle is reconstructed from its transformed center and radius. */
export const compositeCircleEtaType: Term = pi(Point2, pi(Circle2,
  eq(Circle2, pair(fst(transformedCircle(variable(1), variable(0))), snd(transformedCircle(variable(1), variable(0)))),
    transformedCircle(variable(1), variable(0))), 'c'), 'd');
export const compositeCircleEtaProof: Term = lambda(Point2, lambda(Circle2,
  refl(Circle2, transformedCircle(variable(1), variable(0))), 'c'), 'd');

/** Closed certificate for a concrete translate-then-rotate center. */
export const compositeCircleConcreteType: Term = eq(Point2,
  app(rotate90, app(app(translate, pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } })),
    pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } }))),
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } }));
export const compositeCircleConcreteProof: Term = refl(Point2,
  pair({ kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } } } },
    { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Succ', value: { kind: 'Zero' } } } }));
