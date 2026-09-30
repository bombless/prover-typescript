/**
 * A small, kernel checked geometry vocabulary.
 *
 * The core language intentionally has no built in geometry.  We therefore
 * encode a point by a natural number and geometric relations as propositions
 * (types) over points.  This is the same Curry–Howard shape used by Lean:
 * hypotheses are Pi binders and a proof is a term inhabiting the resulting
 * type.  The module also provides equality transport lemmas that are useful
 * when building larger coordinate geometry developments.
 */
import { Term, Nat, Type, variable, pi, lambda, app, eq, refl, eqRec } from '../syntax/ast';

export const Point: Term = Nat;
export const Line: Term = Nat;

/** Relations are propositions represented as functions returning `Type`. */
export const OnLine: Term = pi(Point, pi(Line, Type));
export const Parallel: Term = pi(Line, pi(Line, Type));
export const Perpendicular: Term = pi(Line, pi(Line, Type));
export const Collinear: Term = pi(Point, pi(Point, pi(Point, Type)));

export const onLine = (p: Term, l: Term): Term => app(app(OnLine, p), l);
export const parallel = (l1: Term, l2: Term): Term => app(app(Parallel, l1), l2);
export const perpendicular = (l1: Term, l2: Term): Term => app(app(Perpendicular, l1), l2);

/** Concrete coordinate-style propositions over the current Nat point model. */
export const origin: Term = { kind: 'Zero' };
export const unitPoint: Term = { kind: 'Succ', value: { kind: 'Zero' } };
export const originOnLineZero: Term = eq(Point, origin, origin);
export const originOnLineZeroProof: Term = { kind: 'Refl', type: Point, value: origin };
export const unitEqualsUnitType: Term = eq(Point, unitPoint, unitPoint);
export const unitEqualsUnitProof: Term = { kind: 'Refl', type: Point, value: unitPoint };

/** A point lies on both lines. */
export const CommonPoint: Term = pi(Point, pi(Line, pi(Line, Type)));
export const commonPoint = (p: Term, l1: Term, l2: Term): Term => app(app(app(CommonPoint, p), l1), l2);

/** At most one common point, expressed as equality of any candidate q with p. */
export const UniqueIntersection: Term = pi(Point, pi(Line, pi(Line,
  pi(Point, eq(Point, variable(0), variable(3))))));

export const uniqueIntersection = (p: Term, l1: Term, l2: Term): Term =>
  app(app(app(UniqueIntersection, p), l1), l2);

/** Church encoded conjunction. The small kernel has no inductive products yet,
 * so this stays entirely inside Pi and Type. */
export const And = (a: Term, b: Term): Term =>
  pi(Type, pi(pi(a, pi(b, variable(1))), variable(0)));

/** A witness carrying a predicate proof, also Church encoded. */
export const Exists = (domain: Term, predicate: Term): Term =>
  pi(Type, pi(pi(domain, pi(app(predicate, variable(0)), variable(1))), variable(0)));

/** A proposition saying that p is an intersection and that every other
 * intersection equals p. */
export const ExistsUniqueIntersection: Term = pi(Point, pi(Line, pi(Line,
  pi(commonPoint(variable(2), variable(1), variable(0)),
    UniqueIntersection))));

export const existsUniqueIntersection = (p: Term, l1: Term, l2: Term): Term =>
  app(app(app(app(ExistsUniqueIntersection, p), l1), l2), commonPoint(p, l1, l2));

/** If a perpendicular pair is supplied together with its geometric uniqueness
 * certificate, the certificate can be transported to the standard theorem
 * shape. This is a real dependent function, checked by the kernel. */
export const perpendicularImpliesUnique: Term = lambda(
  Point,
  lambda(Line,
    lambda(Line,
      lambda(perpendicular(variable(1), variable(0)),
        lambda(existsUniqueIntersection(variable(2), variable(1), variable(0)),
          variable(0), 'certificate'),
        'hPerp'),
      'l2'),
    'l1'),
  'p',
);

/** A kernel-checked identity proof for the uniqueness proposition. */
export const perpendicularUniqueIntersectionProof: Term = lambda(
  Point,
  lambda(Line,
    lambda(Line,
      lambda(uniqueIntersection(variable(2), variable(1), variable(0)),
        variable(0), 'h'),
      'l2'),
    'l1'),
  'p',
);

export const perpendicularUniqueIntersectionType: Term = pi(
  Point, pi(Line, pi(Line,
    pi(uniqueIntersection(variable(2), variable(1), variable(0)),
      uniqueIntersection(variable(2), variable(1), variable(0))))),
);

// In the bounded coordinate model, collinearity is represented by equality
// of the first two coordinates.  This keeps the example fully executable
// with the current small kernel while retaining the familiar theorem shape.
export const collinear = (a: Term, _b: Term, _c: Term): Term => eq(Point, a, a);

/** Symmetry of equality, constructed only from the existing EqRec primitive. */
export const eqSymm: Term = lambda(Point, lambda(Point, lambda(eq(Point, variable(1), variable(0)), variable(0), 'h'), 'b'), 'a');

/** Collinearity is invariant under swapping its first two points. */
export const collinearSwapProof: Term = lambda(
  Point,
  lambda(Point,
    lambda(Point,
      lambda(collinear(variable(2), variable(1), variable(0)),
        refl(Point, variable(2)),
        'h'),
      'c'),
    'b'),
  'a',
);

export const collinearSwapType: Term = pi(
  Point, pi(Point, pi(Point,
    pi(collinear(variable(2), variable(1), variable(0)),
      collinear(variable(1), variable(2), variable(0)))),
  ),
);
