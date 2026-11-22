import { Term, Nat, Point, variable, pi, lambda, app, eq, refl, eqRec } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';

/**
 * Geometry in this kernel is stated over opaque `Point` objects. A segment
 * length is obtained from a distance function `dist : Point → Point → Nat`
 * passed in as a hypothesis; segment congruence is an equality of such
 * lengths. Every proof term below still crosses the standard Kernel checker.
 */

/** `dist : Point → Point → Nat`. */
export const distType: Term = pi(Point, pi(Point, Nat, 'q'), 'p');

function distTerm(dist: Term, p: Term, q: Term): Term {
  return app(app(dist, p), q);
}

/** Build a nested Pi chain outer binder first; `body` is the innermost type. */
function piChain(domains: readonly Term[], names: readonly string[], body: Term): Term {
  let result = body;
  for (let i = domains.length - 1; i >= 0; i -= 1) result = pi(domains[i], result, names[i]);
  return result;
}

/** Build a nested lambda chain outer binder first; `body` is the innermost term. */
function lamChain(domains: readonly Term[], names: readonly string[], body: Term): Term {
  let result = body;
  for (let i = domains.length - 1; i >= 0; i -= 1) result = lambda(domains[i], result, names[i]);
  return result;
}

/* --------------------------- equality symmetry and transitivity ------- */

/** `(x y : Nat) → x = y → y = x`. */
export const symmNatType: Term = piChain(
  [Nat, Nat, eq(Nat, variable(1, 'x'), variable(0, 'y'))],
  ['x', 'y', 'h'],
  eq(Nat, variable(1, 'y'), variable(2, 'x'))
);

export const symmNatProof: Term = lamChain(
  [Nat, Nat, eq(Nat, variable(1, 'x'), variable(0, 'y'))],
  ['x', 'y', 'h'],
  eqRec(
    lambda(Nat, eq(Nat, variable(0, 't'), variable(3, 'x')), 't'),
    refl(Nat, variable(2, 'x')),
    variable(2, 'x'),
    variable(1, 'y'),
    variable(0, 'h')
  )
);

/** `(x y z : Nat) → x = y → y = z → x = z`. */
export const transNatType: Term = piChain(
  [
    Nat, Nat, Nat,
    eq(Nat, variable(2, 'x'), variable(1, 'y')),
    eq(Nat, variable(2, 'y'), variable(1, 'z')),
  ],
  ['x', 'y', 'z', 'h1', 'h2'],
  eq(Nat, variable(4, 'x'), variable(2, 'z'))
);

export const transNatProof: Term = lamChain(
  [
    Nat, Nat, Nat,
    eq(Nat, variable(2, 'x'), variable(1, 'y')),
    eq(Nat, variable(2, 'y'), variable(1, 'z')),
  ],
  ['x', 'y', 'z', 'h1', 'h2'],
  eqRec(
    lambda(Nat, eq(Nat, variable(5, 'x'), variable(0, 't')), 't'),
    variable(1, 'h1'),
    variable(3, 'y'),
    variable(2, 'z'),
    variable(0, 'h2')
  )
);

/* --------------------------- addition congruence helpers --------------- */

/** `(x y z : Nat) → x = y → x + z = y + z`. */
export const addRightCongrType: Term = piChain(
  [Nat, Nat, Nat, eq(Nat, variable(2, 'x'), variable(1, 'y'))],
  ['x', 'y', 'z', 'h'],
  eq(Nat, addTerm(variable(3, 'x'), variable(1, 'z')), addTerm(variable(2, 'y'), variable(1, 'z')))
);

export const addRightCongrProof: Term = lamChain(
  [Nat, Nat, Nat, eq(Nat, variable(2, 'x'), variable(1, 'y'))],
  ['x', 'y', 'z', 'h'],
  eqRec(
    lambda(
      Nat,
      eq(Nat, addTerm(variable(4, 'x'), variable(2, 'z')), addTerm(variable(0, 't'), variable(2, 'z'))),
      't'
    ),
    refl(Nat, addTerm(variable(3, 'x'), variable(1, 'z'))),
    variable(3, 'x'),
    variable(2, 'y'),
    variable(0, 'h')
  )
);

/** `(x y z : Nat) → x = y → z + x = z + y`. */
export const addLeftCongrType: Term = piChain(
  [Nat, Nat, Nat, eq(Nat, variable(2, 'x'), variable(1, 'y'))],
  ['x', 'y', 'z', 'h'],
  eq(Nat, addTerm(variable(1, 'z'), variable(3, 'x')), addTerm(variable(1, 'z'), variable(2, 'y')))
);

export const addLeftCongrProof: Term = lamChain(
  [Nat, Nat, Nat, eq(Nat, variable(2, 'x'), variable(1, 'y'))],
  ['x', 'y', 'z', 'h'],
  eqRec(
    lambda(
      Nat,
      eq(Nat, addTerm(variable(2, 'z'), variable(4, 'x')), addTerm(variable(2, 'z'), variable(0, 't'))),
      't'
    ),
    refl(Nat, addTerm(variable(1, 'z'), variable(3, 'x'))),
    variable(3, 'x'),
    variable(2, 'y'),
    variable(0, 'h')
  )
);

/* --------------------------- segment congruence (point level) ---------- */

/** Any segment is congruent to itself: `dist A B = dist A B`. */
export const segReflType: Term = piChain(
  [distType, Point, Point],
  ['dist', 'A', 'B'],
  eq(Nat, distTerm(variable(2, 'dist'), variable(1, 'A'), variable(0, 'B')),
          distTerm(variable(2, 'dist'), variable(1, 'A'), variable(0, 'B')))
);

export const segReflProof: Term = lamChain(
  [distType, Point, Point],
  ['dist', 'A', 'B'],
  refl(Nat, distTerm(variable(2, 'dist'), variable(1, 'A'), variable(0, 'B')))
);

/** Congruence is symmetric: `dist A B = dist C D → dist C D = dist A B`. */
export const segSymType: Term = piChain(
  [distType, Point, Point, Point, Point, eq(Nat,
    distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B')),
    distTerm(variable(4, 'dist'), variable(1, 'C'), variable(0, 'D')))],
  ['dist', 'A', 'B', 'C', 'D', 'h'],
  eq(Nat, distTerm(variable(5, 'dist'), variable(2, 'C'), variable(1, 'D')),
          distTerm(variable(5, 'dist'), variable(4, 'A'), variable(3, 'B')))
);

export const segSymProof: Term = lamChain(
  [distType, Point, Point, Point, Point, eq(Nat,
    distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B')),
    distTerm(variable(4, 'dist'), variable(1, 'C'), variable(0, 'D')))],
  ['dist', 'A', 'B', 'C', 'D', 'h'],
  app(
    app(
      app(symmNatProof,
        distTerm(variable(5, 'dist'), variable(4, 'A'), variable(3, 'B'))),
      distTerm(variable(5, 'dist'), variable(2, 'C'), variable(1, 'D'))),
    variable(0, 'h')
  )
);

/** Congruence is transitive: `AB = CD → CD = EF → AB = EF`. */
export const segTransType: Term = piChain(
  [
    distType, Point, Point, Point, Point, Point, Point,
    eq(Nat, distTerm(variable(6, 'dist'), variable(5, 'A'), variable(4, 'B')),
            distTerm(variable(6, 'dist'), variable(3, 'C'), variable(2, 'D'))),
    eq(Nat, distTerm(variable(7, 'dist'), variable(4, 'C'), variable(3, 'D')),
            distTerm(variable(7, 'dist'), variable(2, 'E'), variable(1, 'F'))),
  ],
  ['dist', 'A', 'B', 'C', 'D', 'E', 'F', 'h1', 'h2'],
  eq(Nat, distTerm(variable(8, 'dist'), variable(7, 'A'), variable(6, 'B')),
          distTerm(variable(8, 'dist'), variable(3, 'E'), variable(2, 'F')))
);

export const segTransProof: Term = lamChain(
  [
    distType, Point, Point, Point, Point, Point, Point,
    eq(Nat, distTerm(variable(6, 'dist'), variable(5, 'A'), variable(4, 'B')),
            distTerm(variable(6, 'dist'), variable(3, 'C'), variable(2, 'D'))),
    eq(Nat, distTerm(variable(7, 'dist'), variable(4, 'C'), variable(3, 'D')),
            distTerm(variable(7, 'dist'), variable(2, 'E'), variable(1, 'F'))),
  ],
  ['dist', 'A', 'B', 'C', 'D', 'E', 'F', 'h1', 'h2'],
  app(
    app(
      app(
        app(
          app(transNatProof,
            distTerm(variable(8, 'dist'), variable(7, 'A'), variable(6, 'B'))),
          distTerm(variable(8, 'dist'), variable(5, 'C'), variable(4, 'D'))),
        distTerm(variable(8, 'dist'), variable(3, 'E'), variable(2, 'F'))),
      variable(1, 'h1')
    ),
    variable(0, 'h2')
  )
);

/** Isosceles: equal legs give equal two-edge chains `AB + BC = AC + BC`. */
export const isoSidesType: Term = piChain(
  [distType, Point, Point, Point, eq(Nat,
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(1, 'B')),
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(0, 'C')))],
  ['dist', 'A', 'B', 'C', 'h'],
  eq(Nat,
    addTerm(distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B')), distTerm(variable(4, 'dist'), variable(2, 'B'), variable(1, 'C'))),
    addTerm(distTerm(variable(4, 'dist'), variable(3, 'A'), variable(1, 'C')), distTerm(variable(4, 'dist'), variable(2, 'B'), variable(1, 'C'))))
);

export const isoSidesProof: Term = lamChain(
  [distType, Point, Point, Point, eq(Nat,
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(1, 'B')),
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(0, 'C')))],
  ['dist', 'A', 'B', 'C', 'h'],
  app(
    app(
      app(
        app(addRightCongrProof,
          distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B'))),
        distTerm(variable(4, 'dist'), variable(3, 'A'), variable(1, 'C'))),
      distTerm(variable(4, 'dist'), variable(2, 'B'), variable(1, 'C'))),
    variable(0, 'h')
  )
);

/**
 * Betweenness: if `AC = AB + BC` (B lies between A and C), then the reverse
 * equality `AB + BC = AC` holds by symmetry.
 */
export const betweenType: Term = piChain(
  [distType, Point, Point, Point, eq(Nat,
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(0, 'C')),
    addTerm(distTerm(variable(3, 'dist'), variable(2, 'A'), variable(1, 'B')), distTerm(variable(3, 'dist'), variable(1, 'B'), variable(0, 'C'))))],
  ['dist', 'A', 'B', 'C', 'h'],
  eq(Nat,
    addTerm(distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B')), distTerm(variable(4, 'dist'), variable(2, 'B'), variable(1, 'C'))),
    distTerm(variable(4, 'dist'), variable(3, 'A'), variable(1, 'C')))
);

export const betweenProof: Term = lamChain(
  [distType, Point, Point, Point, eq(Nat,
    distTerm(variable(3, 'dist'), variable(2, 'A'), variable(0, 'C')),
    addTerm(distTerm(variable(3, 'dist'), variable(2, 'A'), variable(1, 'B')), distTerm(variable(3, 'dist'), variable(1, 'B'), variable(0, 'C'))))],
  ['dist', 'A', 'B', 'C', 'h'],
  app(
    app(
      app(symmNatProof,
        distTerm(variable(4, 'dist'), variable(3, 'A'), variable(1, 'C'))),
      addTerm(distTerm(variable(4, 'dist'), variable(3, 'A'), variable(2, 'B')), distTerm(variable(4, 'dist'), variable(2, 'B'), variable(1, 'C')))),
    variable(0, 'h')
  )
);

/**
 * Two-edge SSS: `AB = DE` and `BC = EF` imply `AB + BC = DE + EF`
 * (two corresponding side pairs give equal broken-line lengths).
 */
export const sssTwoEdgesType: Term = piChain(
  [
    distType, Point, Point, Point, Point, Point, Point,
    eq(Nat, distTerm(variable(6, 'dist'), variable(5, 'A'), variable(4, 'B')),
            distTerm(variable(6, 'dist'), variable(2, 'D'), variable(1, 'E'))),
    eq(Nat, distTerm(variable(7, 'dist'), variable(5, 'B'), variable(4, 'C')),
            distTerm(variable(7, 'dist'), variable(2, 'E'), variable(1, 'F'))),
  ],
  ['dist', 'A', 'B', 'C', 'D', 'E', 'F', 'h1', 'h2'],
  eq(Nat,
    addTerm(distTerm(variable(8, 'dist'), variable(7, 'A'), variable(6, 'B')), distTerm(variable(8, 'dist'), variable(6, 'B'), variable(5, 'C'))),
    addTerm(distTerm(variable(8, 'dist'), variable(4, 'D'), variable(3, 'E')), distTerm(variable(8, 'dist'), variable(3, 'E'), variable(2, 'F'))))
);

export const sssTwoEdgesProof: Term = lamChain(
  [
    distType, Point, Point, Point, Point, Point, Point,
    eq(Nat, distTerm(variable(6, 'dist'), variable(5, 'A'), variable(4, 'B')),
            distTerm(variable(6, 'dist'), variable(2, 'D'), variable(1, 'E'))),
    eq(Nat, distTerm(variable(7, 'dist'), variable(5, 'B'), variable(4, 'C')),
            distTerm(variable(7, 'dist'), variable(2, 'E'), variable(1, 'F'))),
  ],
  ['dist', 'A', 'B', 'C', 'D', 'E', 'F', 'h1', 'h2'],
  (() => {
    const ab = distTerm(variable(8, 'dist'), variable(7, 'A'), variable(6, 'B'));
    const bc = distTerm(variable(8, 'dist'), variable(6, 'B'), variable(5, 'C'));
    const de = distTerm(variable(8, 'dist'), variable(4, 'D'), variable(3, 'E'));
    const ef = distTerm(variable(8, 'dist'), variable(3, 'E'), variable(2, 'F'));
    // h2 : BC = EF, extended on the left by AB: AB + BC = AB + EF.
    const p1 = app(app(app(app(addLeftCongrProof, bc), ef), ab), variable(0, 'h2'));
    // h1 : AB = DE, extended on the right by EF: AB + EF = DE + EF.
    const p2 = app(app(app(app(addRightCongrProof, ab), de), ef), variable(1, 'h1'));
    return app(app(app(app(app(transNatProof, addTerm(ab, bc)), addTerm(ab, ef)), addTerm(de, ef)), p1), p2);
  })()
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

/** Equilateral triangle side 6: `6 + 6 + 6 = 18`. */
export const perimEquilateral6Type: Term = eq(
  Nat,
  addTerm(addTerm(numeral(6), numeral(6)), numeral(6)),
  numeral(18)
);

/** Rectangle 5 × 8: `2*5 + 2*8 = 26`. */
export const rectPerim58Type: Term = eq(
  Nat,
  addTerm(mulTerm(numeral(2), numeral(5)), mulTerm(numeral(2), numeral(8))),
  numeral(26)
);

/** Square side 6: `6 * 6 = 36`. */
export const squarePerim6Type: Term = eq(
  Nat,
  mulTerm(numeral(6), numeral(6)),
  numeral(36)
);

/** Regular octagon side 2: `2 * 8 = 16`. */
export const octagonPerim2Type: Term = eq(
  Nat,
  mulTerm(numeral(2), numeral(8)),
  numeral(16)
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
  perimEquilateral6Type,
  rectPerim58Type,
  squarePerim6Type,
  octagonPerim2Type,
];
