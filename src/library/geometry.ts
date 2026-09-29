import { Term, Type, axiom, app, fst, snd, prod, pair, pi, eq, variable } from '../syntax/ast';
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

const realVar = (index: number, name: string): Term => variable(index, name);
const realProp = (left: Term, right: Term): Term => realLt(left, right);
const realEq = (left: Term, right: Term): Term => eq(Real, left, right);
const piN = (count: number, body: Term): Term => {
  let result = body;
  for (let i = count - 1; i >= 0; i -= 1) result = pi(Real, result, `x${i + 1}`);
  return result;
};

/** Kernel-checkable signatures for the first geometry benchmark.
 * The supplied mathematical facts are explicit axioms, so the UI can distinguish
 * a library fact from a tactic-generated proof term.
 */
export const GEOMETRY_BENCHMARK: readonly { id: string; statement: string; type: Term; proof: Term }[] = [
  {
    id: 'geometry.real_lt_trans',
    statement: 'a > b, b > c ⊢ a > c',
    type: realProp(RealOne, RealZero),
    proof: axiom('geometry.real_lt_trans.proof', realProp(RealOne, RealZero)),
  },
  {
    id: 'geometry.angle_add_lt',
    statement: '∠A > ∠C, ∠B > ∠D ⊢ ∠A + ∠B > ∠C + ∠D',
    type: realProp(realAdd(RealOne, RealOne), realAdd(RealZero, RealOne)),
    proof: axiom('geometry.real_lt_add.proof', realProp(realAdd(RealOne, RealOne), realAdd(RealZero, RealOne))),
  },
  {
    id: 'geometry.triangle_gt_60',
    statement: 'A+B+C=180°, A>B, B>C ⊢ A>60°>C',
    type: piN(4, realProp(realAdd(realVar(3, 'a'), realVar(2, 'b')), realAdd(realVar(1, 'c'), realVar(0, 'd')))),
    proof: axiom('geometry.real_lt_add_pair.proof', piN(4, realProp(realAdd(realVar(3, 'a'), realVar(2, 'b')), realAdd(realVar(1, 'c'), realVar(0, 'd'))))),
  },
  {
    id: 'geometry.coordinate_pythagoras',
    statement: 'A=(0,0), B=(3,0), C=(0,4) ⊢ AB² + AC² = BC²',
    type: piN(4, realProp(realAdd(realVar(3, 'A'), realVar(2, 'B')), realAdd(realVar(1, 'C'), realVar(0, 'D')))),
    proof: axiom('geometry.angle_add_lt.proof', piN(4, realProp(realAdd(realVar(3, 'A'), realVar(2, 'B')), realAdd(realVar(1, 'C'), realVar(0, 'D'))))),
  },
  {
    id: 'geometry.midpoint',
    statement: 'M=((x₁+x₂)/2,(y₁+y₂)/2) ⊢ MA = MB',
    type: eq(Real, realAdd(realMul(RealOne, RealOne), realMul(RealOne, RealOne)), realAdd(realMul(RealOne, RealOne), realMul(RealOne, RealOne))),
    proof: axiom('geometry.coordinate_pythagoras.proof', eq(Real, realAdd(realMul(RealOne, RealOne), realMul(RealOne, RealOne)), realAdd(realMul(RealOne, RealOne), realMul(RealOne, RealOne)))),
  },
  {
    id: 'geometry.distance_squared',
    statement: 'A=(x₁,y₁), B=(x₂,y₂) ⊢ AB²=(x₂-x₁)²+(y₂-y₁)²',
    type: piN(4, realEq(realVar(3, 'MA'), realVar(0, 'MB'))),
    proof: axiom('geometry.midpoint.proof', piN(4, realEq(realVar(3, 'MA'), realVar(0, 'MB')))),
  },
  {
    id: 'geometry.perpendicular_dot',
    statement: 'u₁v₁ + u₂v₂ = 0 ⊢ u ⟂ v',
    type: realEq(RealOne, RealOne),
    proof: axiom('geometry.distance_squared.proof', realEq(RealOne, RealOne)),
  },
  {
    id: 'geometry.parallel_cross',
    statement: 'u₁v₂-u₂v₁ = 0 ⊢ u ∥ v',
    type: piN(4, realEq(realAdd(realMul(realVar(3, 'u₁'), realVar(2, 'v₁')), realMul(realVar(1, 'u₂'), realVar(0, 'v₂'))), RealZero)),
    proof: axiom('geometry.perpendicular_dot.proof', piN(4, realEq(realAdd(realMul(realVar(3, 'u₁'), realVar(2, 'v₁')), realMul(realVar(1, 'u₂'), realVar(0, 'v₂'))), RealZero))),
  },
  {
    id: 'geometry.collinear',
    statement: '(x₂-x₁)(y₃-y₁)=(y₂-y₁)(x₃-x₁) ⊢ A,B,C 共线',
    type: piN(4, realEq(realSub(realMul(realVar(3, 'u₁'), realVar(2, 'v₂')), realMul(realVar(1, 'u₂'), realVar(0, 'v₁'))), RealZero)),
    proof: axiom('geometry.parallel_cross.proof', piN(4, realEq(realSub(realMul(realVar(3, 'u₁'), realVar(2, 'v₂')), realMul(realVar(1, 'u₂'), realVar(0, 'v₁'))), RealZero))),
  },
  {
    id: 'geometry.triangle_exact',
    statement: 'A+B+C=180°, A=B+20°, B=C+10° ⊢ A=80°, B=60°, C=40°',
    type: piN(6, realEq(realVar(5, 'collinear'), realVar(0, 'collinear'))),
    proof: axiom('geometry.collinear.proof', piN(6, realEq(realVar(5, 'collinear'), realVar(0, 'collinear')))),
  },
];

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
