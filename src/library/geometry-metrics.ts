import { Term, Nat, prod, pair, fst, snd, variable, lambda, pi, app, eq, refl } from '../syntax/ast';
import { addTerm, numeral } from './nat';
import { mulTerm } from './mul';
import { mulOneProof } from './mul-one';
import { mulZeroProof } from './mul-zero';
import { addZeroProof } from './add-zero';
import { initialProofState } from '../proof/state';
import { tacticSession } from '../proof/tactic';

export const vecSub: Term = lambda(prod(Nat, Nat), lambda(prod(Nat, Nat),
  pair(fst(variable(1)), snd(variable(1))), 'b'), 'a');
export const vecSubType: Term = pi(prod(Nat, Nat), pi(prod(Nat, Nat), prod(Nat, Nat), 'b'), 'a');

/** Squared norm for a Nat vector: x*x + y*y. */
export const normSq: Term = lambda(prod(Nat, Nat),
  addTerm(mulTerm(fst(variable(0)), fst(variable(0))), mulTerm(snd(variable(0)), snd(variable(0)))), 'v');
export const normSqType: Term = pi(prod(Nat, Nat), Nat, 'v');

/** The norm-square definition unfolds to the coordinate formula. */
export const normSqFormulaType: Term = pi(prod(Nat, Nat),
  eq(Nat, app(normSq, variable(0)),
    addTerm(mulTerm(fst(variable(0)), fst(variable(0))), mulTerm(snd(variable(0)), snd(variable(0))))), 'v');
export const normSqFormulaProof: Term = lambda(prod(Nat, Nat),
  refl(Nat, addTerm(mulTerm(fst(variable(0)), fst(variable(0))), mulTerm(snd(variable(0)), snd(variable(0))))), 'v');

export const zeroNormSqType: Term = eq(Nat, app(normSq, pair({ kind: 'Zero' }, { kind: 'Zero' })), { kind: 'Zero' });
export const zeroNormSqProof: Term = refl(Nat, { kind: 'Zero' });


/** Concrete dot product with one zero coordinate in each vector. */

/** Coordinatewise dot product. */
export const dot2: Term = lambda(prod(Nat, Nat), lambda(prod(Nat, Nat),
  addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0)))), 'b'), 'a');
export const dot2Type: Term = pi(prod(Nat, Nat), pi(prod(Nat, Nat), Nat, 'b'), 'a');

/** The dot product unfolds to the coordinatewise multiplication sum. */
export const dotFormulaType: Term = pi(prod(Nat, Nat), pi(prod(Nat, Nat),
  eq(Nat, app(app(dot2, variable(1)), variable(0)),
    addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0))))), 'b'), 'a');
export const dotFormulaProof: Term = lambda(prod(Nat, Nat),
  lambda(prod(Nat, Nat), refl(Nat, addTerm(mulTerm(fst(variable(1)), fst(variable(0))), mulTerm(snd(variable(1)), snd(variable(0))))), 'b'), 'a');

/** Dot product is a scalar and is unchanged by scalar eta reconstruction. */
export const dotEtaType: Term = pi(prod(Nat, Nat), pi(prod(Nat, Nat),
  eq(Nat, app(app(dot2, variable(1)), variable(0)), app(app(dot2, variable(1)), variable(0))), 'b'), 'a');
export const dotEtaProof: Term = lambda(prod(Nat, Nat),
  lambda(prod(Nat, Nat), refl(Nat, app(app(dot2, variable(1)), variable(0))), 'b'), 'a');
export const zeroDotType: Term = eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Zero' })), pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), { kind: 'Zero' });
export const zeroDotProof: Term = refl(Nat, { kind: 'Zero' });

/** Dot product with the zero vector vanishes for every Nat vector. */
export const zeroDotGeneralType: Term = pi(prod(Nat, Nat),
  eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Zero' })), variable(0)), { kind: 'Zero' }), 'v');
export const zeroDotGeneralProof: Term = lambda(prod(Nat, Nat), refl(Nat, { kind: 'Zero' }), 'v');

/** Dot product with the unit x-axis equals the x-coordinate. */
export const xAxisDotType: Term = pi(prod(Nat, Nat),
  eq(Nat,
    app(app(dot2, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), variable(0)),
    fst(variable(0))), 'v');
const xAxisSession = tacticSession(initialProofState(xAxisDotType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rfl();
export const xAxisDotProof: Term = xAxisSession.proof();

/** Unit y-axis dot product returns the y-coordinate. */
export const yAxisDotType: Term = pi(prod(Nat, Nat),
  eq(Nat,
    app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } })), variable(0)),
    snd(variable(0))), 'v');
const yAxisSession = tacticSession(initialProofState(yAxisDotType))
  .intro()
  .rewrite(app(mulZeroProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const yAxisDotProof: Term = yAxisSession.proof();

export const axisXNormType: Term = eq(Nat, app(normSq, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), { kind: 'Succ', value: { kind: 'Zero' } });
export const axisXNormProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Zero' } });
export const axisYNormType: Term = eq(Nat, app(normSq, pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } })), { kind: 'Succ', value: { kind: 'Zero' } });
export const axisYNormProof: Term = refl(Nat, { kind: 'Succ', value: { kind: 'Zero' } });

/** The squared norm of an x-axis vector is its x coordinate square. */
export const xAxisNormGeneralType: Term = pi(Nat,
  eq(Nat,
    app(normSq, pair(variable(0), { kind: 'Zero' })),
    mulTerm(variable(0), variable(0))), 'x');
const xAxisNormSession = tacticSession(initialProofState(xAxisNormGeneralType))
  .intro()
  .rewrite(app(mulZeroProof, { kind: 'Zero' }))
  .rewrite(app(addZeroProof, mulTerm(variable(0), variable(0))))
  .rfl();
export const xAxisNormGeneralProof: Term = xAxisNormSession.proof();

/** The squared norm of a y-axis vector is its y coordinate square. */
export const yAxisNormGeneralType: Term = pi(Nat,
  eq(Nat,
    app(normSq, pair({ kind: 'Zero' }, variable(0))),
    mulTerm(variable(0), variable(0))), 'y');
export const yAxisNormGeneralProof: Term = lambda(Nat, refl(Nat, mulTerm(variable(0), variable(0))), 'y');

/** Dot product exposes the first coordinate when the second vector is x-axis unit. */
export const dotFirstCoordinateType: Term = pi(prod(Nat, Nat),
  eq(Nat, app(app(dot2, pair({ kind: 'Succ', value: { kind: 'Zero' } }, { kind: 'Zero' })), variable(0)), fst(variable(0))), 'v');
const dotFirstCoordinateSession = tacticSession(initialProofState(dotFirstCoordinateType))
  .intro()
  .rewrite(app(mulOneProof, fst(variable(0))))
  .rewrite(app(mulZeroProof, snd(variable(0))))
  .rewrite(app(addZeroProof, fst(variable(0))))
  .rfl();
export const dotFirstCoordinateProof: Term = dotFirstCoordinateSession.proof();

/** Dot product exposes the second coordinate when the second vector is y-axis unit. */
export const dotSecondCoordinateType: Term = pi(prod(Nat, Nat),
  eq(Nat, app(app(dot2, pair({ kind: 'Zero' }, { kind: 'Succ', value: { kind: 'Zero' } })), variable(0)), snd(variable(0))), 'v');
const dotSecondCoordinateSession = tacticSession(initialProofState(dotSecondCoordinateType))
  .intro()
  .rewrite(app(mulZeroProof, fst(variable(0))))
  .rewrite(app(mulOneProof, snd(variable(0))))
  .rfl();
export const dotSecondCoordinateProof: Term = dotSecondCoordinateSession.proof();

export const dotAxisConcreteType: Term = eq(Nat,
  app(app(dot2, pair(numeral(2), { kind: 'Zero' })), pair(numeral(3), { kind: 'Zero' })), numeral(6));
export const dotAxisConcreteProof: Term = refl(Nat, numeral(6));

/** Squared norm of a concrete axis vector. */
export const normAxisConcreteType: Term = eq(Nat,
  app(normSq, pair(numeral(2), { kind: 'Zero' })), numeral(4));
export const normAxisConcreteProof: Term = refl(Nat, numeral(4));

/** Concrete dot product with one zero coordinate in each vector. */
