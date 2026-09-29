import { Term, Type, axiom, app, fst, snd, prod, pair, pi } from '../syntax/ast';
import { GlobalEnvironment } from '../environment/environment';

/** Abstract real-number interface. Mathematical field facts are explicit axioms. */
export const Real: Term = axiom('Real', Type);
export const RealZero: Term = axiom('realZero', Real);
export const RealOne: Term = axiom('realOne', Real);
export const RealAdd: Term = axiom('realAdd', pi(Real, pi(Real, Real)));
export const RealSub: Term = axiom('realSub', pi(Real, pi(Real, Real)));
export const RealMul: Term = axiom('realMul', pi(Real, pi(Real, Real)));
export const RealDiv: Term = axiom('realDiv', pi(Real, pi(Real, Real)));
export const RealNeg: Term = axiom('realNeg', pi(Real, Real));
export const RealLt: Term = axiom('realLt', pi(Real, pi(Real, Type)));

/** Cartesian plane: a point is an ordered pair (x, y) of real coordinates. */
export const Point: Term = prod(Real, Real);
export const point = (x: Term, y: Term): Term => pair(x, y, Real, Real);
export const xCoord = (p: Term): Term => fst(p);
export const yCoord = (p: Term): Term => snd(p);

/** Segment and angle are geometric objects indexed by their points. */
export const Segment: Term = axiom('Segment', pi(Point, pi(Point, Type)));
export const Angle: Term = axiom('Angle', pi(Point, pi(Point, pi(Point, Type))));

const segmentCtorType = pi(Point, pi(Point, app(app(Segment, { kind: 'Var', index: 1 }), { kind: 'Var', index: 0 })));
const angleCtorType = pi(Point, pi(Point, pi(Point,
  app(app(app(Angle, { kind: 'Var', index: 2 }), { kind: 'Var', index: 1 }), { kind: 'Var', index: 0 })
)));
export const makeSegment: Term = axiom('segment', segmentCtorType);
export const angleConstructor: Term = axiom('angle', angleCtorType);
export const makeSegmentTerm = (a: Term, b: Term): Term => app(app(makeSegment, a), b);
export const angle = (a: Term, vertex: Term, c: Term): Term => app(app(app(angleConstructor, a), vertex), c);

/** Numeric measurements are abstract operations; their theorems remain auditable axioms. */
export const segmentLength: Term = axiom('segmentLength', pi(Point, pi(Point,
  pi(app(app(Segment, { kind: 'Var', index: 1 }), { kind: 'Var', index: 0 }), Real)
)));
export const angleMeasure: Term = axiom('angleMeasure', pi(Point, pi(Point, pi(Point,
  pi(app(app(app(Angle, { kind: 'Var', index: 2 }), { kind: 'Var', index: 1 }), { kind: 'Var', index: 0 }), Real)
))));
export const distanceSquared: Term = axiom('distanceSquared', pi(Point, pi(Point, Real)));
export const rightAngle: Term = axiom('rightAngle', Real);

export const realAdd = (a: Term, b: Term): Term => app(app(RealAdd, a), b);
export const realSub = (a: Term, b: Term): Term => app(app(RealSub, a), b);
export const realMul = (a: Term, b: Term): Term => app(app(RealMul, a), b);
export const realDiv = (a: Term, b: Term): Term => app(app(RealDiv, a), b);
export const realNeg = (a: Term): Term => app(RealNeg, a);
export const realLt = (a: Term, b: Term): Term => app(app(RealLt, a), b);
export const length = (a: Term, b: Term, s: Term): Term => app(app(app(segmentLength, a), b), s);
export const measure = (a: Term, vertex: Term, c: Term, angleTerm: Term): Term => app(app(app(app(angleMeasure, a), vertex), c), angleTerm);
export const distance2 = (a: Term, b: Term): Term => app(app(distanceSquared, a), b);

export function installGeometryEnvironment(environment: GlobalEnvironment): GlobalEnvironment {
  const definitions: readonly [string, Term][] = [
    ['Real', Real], ['realZero', RealZero], ['realOne', RealOne],
    ['realAdd', RealAdd], ['realSub', RealSub], ['realMul', RealMul], ['realDiv', RealDiv], ['realNeg', RealNeg], ['realLt', RealLt],
    ['Point', Point], ['Segment', Segment], ['Angle', Angle], ['segment', makeSegment], ['angle', angleConstructor],
    ['segmentLength', segmentLength], ['angleMeasure', angleMeasure], ['distanceSquared', distanceSquared], ['rightAngle', rightAngle],
  ];
  for (const [name, term] of definitions) environment.define(name, term);
  return environment;
}
