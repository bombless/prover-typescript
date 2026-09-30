import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';
import { incidence, Point2, Line2 } from './geometry-incidence';

/** Incidence of the origin with the origin line is definitionally reflexive. */
export const originIncidence: Term = app(app(incidence,
  pair({ kind: 'Zero' }, { kind: 'Zero' })),
  pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair({ kind: 'Zero' }, { kind: 'Zero' })));
export const originIncidenceProof: Term = refl(Nat, { kind: 'Zero' });
export const originIncidenceType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });

/** A vertical line incidence family, abstracted over x and y coordinates. */
export const verticalIncidenceType: Term = pi(Nat, pi(Nat, pi(Nat, { kind: 'Type' }, 'a'), 'y'), 'x');
