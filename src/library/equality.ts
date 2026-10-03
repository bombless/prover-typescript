import { Term, Type, app, eq, eqRec, lambda, pi, refl, variable } from '../syntax/ast';

/** (A : Type) -> (a b : A) -> Eq A a b -> Eq A b a. */
export const equalitySymmetryType: Term = pi(Type,
  pi(variable(0), pi(variable(1), pi(
    eq(variable(2), variable(1), variable(0)),
    eq(variable(3), variable(1), variable(2)), 'h'), 'b'), 'a'), 'A');

export const equalitySymmetryProof: Term = lambda(Type,
  lambda(variable(0), lambda(variable(1), lambda(
    eq(variable(2), variable(1), variable(0)),
    eqRec(
      lambda(variable(3), eq(variable(4), variable(0), variable(3)), 'x'),
      refl(variable(3), variable(2)), variable(2), variable(1), variable(0),
    ), 'h'), 'b'), 'a'), 'A');

/** (A : Type) -> (a b c : A) -> Eq A a b -> Eq A b c -> Eq A a c. */
export const equalityTransitivityType: Term = pi(Type,
  pi(variable(0), pi(variable(1), pi(variable(2), pi(
    eq(variable(3), variable(2), variable(1)), pi(
      eq(variable(4), variable(2), variable(1)),
      eq(variable(5), variable(4), variable(2)), 'bc'), 'ab'), 'c'), 'b'), 'a'), 'A');

export const equalityTransitivityProof: Term = lambda(Type,
  lambda(variable(0), lambda(variable(1), lambda(variable(2), lambda(
    eq(variable(3), variable(2), variable(1)), lambda(
      eq(variable(4), variable(2), variable(1)),
      eqRec(
        lambda(variable(5), eq(variable(6), variable(5), variable(0)), 'x'),
        variable(1), variable(3), variable(2), variable(0),
      ), 'bc'), 'ab'), 'c'), 'b'), 'a'), 'A');

/** Congruence for a non-dependent function f : A -> B. */
export const equalityCongruenceType: Term = pi(Type, pi(Type,
  pi(pi(variable(1), variable(1)), pi(variable(2), pi(variable(3), pi(
    eq(variable(4), variable(1), variable(0)),
    eq(variable(4), app(variable(3), variable(2)), app(variable(3), variable(1))),
    'h'), 'b'), 'a'), 'f'), 'B'), 'A');

export const equalityCongruenceProof: Term = lambda(Type, lambda(Type,
  lambda(pi(variable(1), variable(1)), lambda(variable(2), lambda(variable(3), lambda(
    eq(variable(4), variable(1), variable(0)),
    eqRec(
      lambda(variable(5), eq(variable(5), app(variable(4), variable(3)), app(variable(4), variable(0))), 'x'),
      refl(variable(4), app(variable(3), variable(2))), variable(2), variable(1), variable(0),
    ), 'h'), 'b'), 'a'), 'f'), 'B'), 'A');

export function equalitySymmetry(type: Term, left: Term, right: Term, evidence: Term): Term {
  return [type, left, right, evidence].reduce(app, equalitySymmetryProof);
}

export function equalityTransitivity(type: Term, left: Term, middle: Term, right: Term, first: Term, second: Term): Term {
  return [type, left, middle, right, first, second].reduce(app, equalityTransitivityProof);
}

export function equalityCongruence(domain: Term, codomain: Term, fn: Term, left: Term, right: Term, evidence: Term): Term {
  return [domain, codomain, fn, left, right, evidence].reduce(app, equalityCongruenceProof);
}
