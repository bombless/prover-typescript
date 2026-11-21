import { Term, Nat, variable, pi, lambda, app, eq, refl, eqRec } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { addCommProof } from './add-comm';

/**
 * Geometry in this kernel is built on natural-number lengths: every segment,
 * side, or perimeter is a Nat. The propositions below are length equalities
 * that a geometry course states about segments, triangles, and polygons, but
 * each proof term still crosses the standard Kernel type checker.
 */

/* ------------------------------------------ right-congruence of addition */

/**
 * `(x y z : Nat) → x = y → x + z = y + z`
 *
 * Equal lengths extended by the same remaining segment stay equal.
 */
export const addRightCongrType: Term = pi(
  Nat,
  pi(
    Nat,
    pi(
      Nat,
      pi(
        eq(Nat, variable(2, 'x'), variable(1, 'y')),
        eq(Nat, addTerm(variable(3, 'x'), variable(1, 'z')), addTerm(variable(2, 'y'), variable(1, 'z'))),
        'h'
      ),
      'z'
    ),
    'y'
  ),
  'x'
);

/**
 * Transport along `h : x = y` with motive `Q(t) = x + z = t + z`. The
 * reflexivity case is `x + z = x + z`; Eq.rec moves it to `y`.
 */
export const addRightCongrProof: Term = lambda(
  Nat,
  lambda(
    Nat,
    lambda(
      Nat,
      lambda(
        eq(Nat, variable(2, 'x'), variable(1, 'y')),
        eqRec(
          lambda(
            Nat,
            eq(
              Nat,
              addTerm(variable(4, 'x'), variable(2, 'z')),
              addTerm(variable(0, 't'), variable(2, 'z'))
            ),
            't'
          ),
          refl(Nat, addTerm(variable(3, 'x'), variable(1, 'z'))),
          variable(3, 'x'),
          variable(2, 'y'),
          variable(0, 'h')
        ),
        'h'
      ),
      'z'
    ),
    'y'
  ),
  'x'
);

/* --------------------------------------------- perimeter base swapping */

/**
 * `(a b c : Nat) → a + b + c = b + a + c`
 *
 * Swapping the two sides that meet at a vertex does not change the perimeter.
 */
export const perimSwapType: Term = pi(
  Nat,
  pi(
    Nat,
    pi(
      Nat,
      eq(
        Nat,
        addTerm(addTerm(variable(2, 'a'), variable(1, 'b')), variable(0, 'c')),
        addTerm(addTerm(variable(1, 'b'), variable(2, 'a')), variable(0, 'c'))
      ),
      'c'
    ),
    'b'
  ),
  'a'
);

/**
 * `add_comm a b : a + b = b + a`, then `addRightCongr` extends both sides by
 * the remaining side `c`.
 */
export const perimSwapProof: Term = lambda(
  Nat,
  lambda(
    Nat,
    lambda(
      Nat,
      app(
        app(
          app(
            app(
              addRightCongrProof,
              addTerm(variable(2, 'a'), variable(1, 'b'))
            ),
            addTerm(variable(1, 'b'), variable(2, 'a'))
          ),
          variable(0, 'c')
        ),
        app(app(addCommProof, variable(2, 'a')), variable(1, 'b'))
      ),
      'c'
    ),
    'b'
  ),
  'a'
);

/* ----------------------------- closed perimeter computations ----------- */

/** 3-4-5 triangle: `3 + 4 + 5 = 12`. */
export const perim345Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(3), numeral(4)), numeral(5)),
  numeral(12)
);

/** Equilateral triangle side 3: `3 + 3 + 3 = 9`. */
export const perimEquilateral3Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(3), numeral(3)), numeral(3)),
  numeral(9)
);

/** Isosceles triangle sides 5, 5, 8: `5 + 5 + 8 = 18`. */
export const perimIsosceles558Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(5), numeral(5)), numeral(8)),
  numeral(18)
);

/** Equilateral triangle side 5: `5 + 5 + 5 = 15`. */
export const perimEquilateral5Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(5), numeral(5)), numeral(5)),
  numeral(15)
);

/** 6-8-10 triangle: `6 + 8 + 10 = 24`. */
export const perim6810Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(6), numeral(8)), numeral(10)),
  numeral(24)
);

/** Equilateral triangle side 4: `4 + 4 + 4 = 12`. */
export const perimEquilateral4Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(4), numeral(4)), numeral(4)),
  numeral(12)
);

/** Rectangle 3 × 5: `2*3 + 2*5 = 16`. */
export const rectPerim35Type: Term = eq(
  Nat,
  addTerm(mulTerm(numeral(2), numeral(3)), mulTerm(numeral(2), numeral(5))),
  numeral(16)
);

/** Square side 4: `4 * 4 = 16`. */
export const squarePerim4Type: Term = eq(
  Nat,
  mulTerm(numeral(4), numeral(4)),
  numeral(16)
);

/** Rectangle 4 × 6: `2*4 + 2*6 = 20`. */
export const rectPerim46Type: Term = eq(
  Nat,
  addTerm(mulTerm(numeral(2), numeral(4)), mulTerm(numeral(2), numeral(6))),
  numeral(20)
);

/** Square side 5: `5 * 5 = 25`. */
export const squarePerim5Type: Term = eq(
  Nat,
  mulTerm(numeral(5), numeral(5)),
  numeral(25)
);

/** Regular pentagon side 3: `3 * 5 = 15`. */
export const pentagonPerim3Type: Term = eq(
  Nat,
  mulTerm(numeral(3), numeral(5)),
  numeral(15)
);

/** Regular hexagon side 4: `4 * 6 = 24`. */
export const hexagonPerim4Type: Term = eq(
  Nat,
  mulTerm(numeral(4), numeral(6)),
  numeral(24)
);

/** All closed perimeter propositions, for batch Kernel normalization checks. */
export const closedPerimeterTypes: readonly Term[] = [
  perim345Type,
  perimEquilateral3Type,
  perimIsosceles558Type,
  perimEquilateral5Type,
  perim6810Type,
  perimEquilateral4Type,
  rectPerim35Type,
  squarePerim4Type,
  rectPerim46Type,
  squarePerim5Type,
  pentagonPerim3Type,
  hexagonPerim4Type,
];
