import { Term, Nat, prod, pair, fst, snd, variable, pi, lambda, app, eq, refl } from '../syntax/ast';

export const Point2: Term = prod(Nat, Nat);
export const Line2: Term = prod(Point2, prod(Nat, Nat));
export const incidence: Term = lambda(Point2, lambda(Line2,
  eq(Nat, fst(variable(1)), fst(fst(variable(0)))), 'l'), 'p');
export const incidenceType: Term = pi(Point2, pi(Line2, { kind: 'Type' }, 'l'), 'p');
export const originLine: Term = pair(pair({ kind: 'Zero' }, { kind: 'Zero' }), pair({ kind: 'Zero' }, { kind: 'Zero' }));
export const originIncidenceType: Term = eq(Nat, { kind: 'Zero' }, { kind: 'Zero' });
export const originIncidenceProof: Term = refl(Nat, { kind: 'Zero' });


/** Incidence unfolds to equality of the point and line base x coordinates. */
