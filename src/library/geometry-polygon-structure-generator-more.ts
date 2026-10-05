import { Term, Nat, prod, variable, pi, lambda, app, eq, refl, fst, snd } from '../syntax/ast';
import { Point2 } from './geometry-points';
import { translate } from './geometry-transform';
import { addTerm } from './nat';

/** Build the nested product type used for an n-vertex polygon. */
export const polygonType = (count: number): Term => {
  let result: Term = Point2;
  for (let i = 1; i < count; i += 1) result = prod(Point2, result);
  return result;
};

export const Undecagon2: Term = polygonType(11);
export const Dodecagon2: Term = polygonType(12);

/** Every generated polygon exposes its first vertex. */
export const undecagonFirstType: Term = pi(Undecagon2, eq(Point2, fst(variable(0)), fst(variable(0))), 'u');
export const undecagonFirstProof: Term = lambda(Undecagon2, refl(Point2, fst(variable(0))), 'u');
export const dodecagonFirstType: Term = pi(Dodecagon2, eq(Point2, fst(variable(0)), fst(variable(0))), 'd');
export const dodecagonFirstProof: Term = lambda(Dodecagon2, refl(Point2, fst(variable(0))), 'd');

/** The generated tail type is exactly the second projection. */
export const undecagonTailType: Term = pi(Undecagon2, eq(polygonType(10), snd(variable(0)), snd(variable(0))), 'u');
export const undecagonTailProof: Term = lambda(Undecagon2, refl(polygonType(10), snd(variable(0))), 'u');
export const dodecagonTailType: Term = pi(Dodecagon2, eq(polygonType(11), snd(variable(0)), snd(variable(0))), 'd');
export const dodecagonTailProof: Term = lambda(Dodecagon2, refl(polygonType(11), snd(variable(0))), 'd');

/** Project the n-th vertex (0-based) from a nested polygon. */
export const polygonVertex = (polygon: Term, index: number): Term => {
  let result = polygon;
  for (let i = 0; i < index; i += 1) result = snd(result);
  return fst(result);
};

export const Fifteenagon2: Term = polygonType(15);
export const Sixteenagon2: Term = polygonType(16);
export const Twentyagon2: Term = polygonType(20);
export const fifteenFirstType: Term = pi(Fifteenagon2, eq(Point2, polygonVertex(variable(0), 0), polygonVertex(variable(0), 0)), 'f');
export const fifteenFirstProof: Term = lambda(Fifteenagon2, refl(Point2, polygonVertex(variable(0), 0)), 'f');
export const sixteenFirstType: Term = pi(Sixteenagon2, eq(Point2, polygonVertex(variable(0), 0), polygonVertex(variable(0), 0)), 's');
export const sixteenFirstProof: Term = lambda(Sixteenagon2, refl(Point2, polygonVertex(variable(0), 0)), 's');
export const twentyVertex3Type: Term = pi(Twentyagon2, eq(Point2, polygonVertex(variable(0), 3), polygonVertex(variable(0), 3)), 't');
export const twentyVertex3Proof: Term = lambda(Twentyagon2, refl(Point2, polygonVertex(variable(0), 3)), 't');
export const twentyTailType: Term = pi(Twentyagon2, eq(polygonType(19), snd(variable(0)), snd(variable(0))), 't');
export const twentyTailProof: Term = lambda(Twentyagon2, refl(polygonType(19), snd(variable(0))), 't');

/** The first vertex of any generated polygon has the expected translated x coordinate. */
export const twentyFirstTranslatedXType: Term = pi(Twentyagon2, pi(Point2,
  eq(Nat, fst(app(app(translate, fst(variable(1))), variable(0))),
    addTerm(fst(fst(variable(1))), fst(variable(0)))), 'd'), 'p');
export const twentyFirstTranslatedXProof: Term = lambda(Twentyagon2, lambda(Point2,
  refl(Nat, addTerm(fst(fst(variable(1))), fst(variable(0)))), 'd'), 'p');

/** Construct a reflexive projection certificate for any polygon and index. */
export const polygonVertexType = (polygon: Term, index: number): Term =>
  pi(polygon, eq(Point2, polygonVertex(variable(0), index), polygonVertex(variable(0), index)), 'p');
export const polygonVertexProof = (polygon: Term, index: number): Term =>
  lambda(polygon, refl(Point2, polygonVertex(variable(0), index)), 'p');
