import { Term, Nat, Bool, True, False, Zero, variable, pi, lambda, succ, natRec, eq, refl } from '../syntax/ast';

/** isZero 0 = true, isZero (Succ n) = false. */
export const isZero: Term = lambda(Nat,
  natRec(lambda(Nat, Bool), True, lambda(Nat, lambda(Nat, False)), variable(0)), 'n');
export const isZeroType: Term = pi(Nat, Bool, 'n');
export const isZeroZeroType: Term = eq(Bool, { kind: 'App', fn: isZero, arg: Zero }, True);
export const isZeroZeroProof: Term = refl(Bool, True);
export const isZeroSuccType: Term = pi(Nat, eq(Bool, { kind: 'App', fn: isZero, arg: succ(variable(0)) }, False), 'n');
export const isZeroSuccProof: Term = lambda(Nat, refl(Bool, False), 'n');

/** isZero remains false after any positive successor depth. */
export const isZeroSuccSuccType: Term = pi(Nat,
  eq(Bool, { kind: 'App', fn: isZero, arg: succ(succ(variable(0))) }, False), 'n');
export const isZeroSuccSuccProof: Term = lambda(Nat, refl(Bool, False), 'n');

export const isZeroSuccTripleType: Term = pi(Nat,
  eq(Bool, { kind: 'App', fn: isZero, arg: succ(succ(succ(variable(0)))) }, False), 'n');
export const isZeroSuccTripleProof: Term = lambda(Nat, refl(Bool, False), 'n');

/** isZero remains false after four successor constructors. */
export const isZeroSuccQuadType: Term = pi(Nat,
  eq(Bool,
    { kind: 'App', fn: isZero, arg: succ(succ(succ(succ(variable(0))))) },
    False), 'n');
export const isZeroSuccQuadProof: Term = lambda(Nat, refl(Bool, False), 'n');

/** parity by recursive toggling. */
export const parity: Term = lambda(Nat,
  natRec(lambda(Nat, Bool), True,
    lambda(Nat, lambda(Nat,
      { kind: 'BoolRec', motive: lambda(Bool, Bool), trueCase: False, falseCase: True, scrutinee: variable(0) })),
    variable(0)), 'n');
export const parityType: Term = pi(Nat, Bool, 'n');
export const parityZeroType: Term = eq(Bool, True, True);
export const parityZeroProof: Term = refl(Bool, True);

/** Concrete parity computations for the first successors. */
export const parityOneType: Term = eq(Bool,
  { kind: 'App', fn: parity, arg: succ(Zero) }, False);
export const parityOneProof: Term = refl(Bool, False);
export const parityTwoType: Term = eq(Bool,
  { kind: 'App', fn: parity, arg: succ(succ(Zero)) }, True);
export const parityTwoProof: Term = refl(Bool, True);
export const parityThreeType: Term = eq(Bool,
  { kind: 'App', fn: parity, arg: succ(succ(succ(Zero))) }, False);
export const parityThreeProof: Term = refl(Bool, False);
export const parityFourType: Term = eq(Bool,
  { kind: 'App', fn: parity, arg: succ(succ(succ(succ(Zero)))) }, True);
export const parityFourProof: Term = refl(Bool, True);

export const isZeroConcreteZeroType: Term = eq(Bool, { kind: 'App', fn: isZero, arg: Zero }, True);
export const isZeroConcreteZeroProof: Term = refl(Bool, True);
export const isZeroConcreteThreeType: Term = eq(Bool, { kind: 'App', fn: isZero, arg: succ(succ(succ(Zero))) }, False);
export const isZeroConcreteThreeProof: Term = refl(Bool, False);
