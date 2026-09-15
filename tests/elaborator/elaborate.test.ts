import assert from 'node:assert/strict';
import test from 'node:test';
import { elaborate, ElaborationError } from '../../src/elaborator/elaborate';
import {
  surfaceEq,
  surfaceEqRec,
  surfaceLambda,
  surfaceNat,
  surfaceNatRec,
  surfacePi,
  surfaceRefl,
  surfaceSucc,
  surfaceVar,
  surfaceZero,
} from '../../src/syntax/surface';
import { infer, check } from '../../src/kernel/typecheck';
import { Nat, Zero, variable, pi, lambda, succ, natRec, eq, refl, eqRec, app } from '../../src/syntax/ast';

test('elaborates Nat, Zero, and Succ', () => {
  assert.deepEqual(elaborate(surfaceNat), Nat);
  assert.deepEqual(elaborate(surfaceZero), Zero);
  assert.deepEqual(elaborate(surfaceSucc(surfaceZero)), succ(Zero));
});

test('resolves simple, nested, and shadowed variables', () => {
  assert.deepEqual(elaborate(surfaceLambda('x', surfaceNat, surfaceVar('x'))), lambda(Nat, variable(0, 'x'), 'x'));
  assert.deepEqual(elaborate(surfaceLambda('x', surfaceNat, surfaceLambda('y', surfaceNat, surfaceVar('x')))), lambda(Nat, lambda(Nat, variable(1, 'x'), 'y'), 'x'));
  assert.deepEqual(elaborate(surfaceLambda('x', surfaceNat, surfaceLambda('y', surfaceNat, surfaceVar('y')))), lambda(Nat, lambda(Nat, variable(0, 'y'), 'y'), 'x'));
  assert.deepEqual(elaborate(surfaceLambda('x', surfaceNat, surfaceLambda('x', surfaceNat, surfaceVar('x')))), lambda(Nat, lambda(Nat, variable(0, 'x'), 'x'), 'x'));
});

test('reports unknown variables as ElaborationError', () => {
  assert.throws(() => elaborate(surfaceVar('x')), (error: unknown) => error instanceof ElaborationError && error.message === 'Unknown variable: x');
});

test('elaborates App and dependent Pi', () => {
  assert.deepEqual(elaborate(surfacePi('x', surfaceNat, surfaceVar('x'))), pi(Nat, variable(0, 'x'), 'x'));
  const core = elaborate(surfaceLambda('f', surfacePi('x', surfaceNat, surfaceNat), surfaceLambda('x', surfaceNat, { kind: 'App', fn: surfaceVar('f'), arg: surfaceVar('x') })));
  assert.deepEqual(core, lambda(pi(Nat, Nat, 'x'), lambda(Nat, app(variable(1, 'f'), variable(0, 'x')), 'x'), 'f'));
});

test('elaborates Eq, Refl, NatRec, and EqRec', () => {
  const eqCore = elaborate(surfaceLambda('x', surfaceNat, surfaceLambda('y', surfaceNat, surfaceEq(surfaceNat, surfaceVar('x'), surfaceVar('y')))));
  assert.deepEqual(eqCore, lambda(Nat, lambda(Nat, eq(Nat, variable(1, 'x'), variable(0, 'y')), 'y'), 'x'));
  assert.deepEqual(elaborate(surfaceRefl(surfaceNat, surfaceZero)), refl(Nat, Zero));
  const nr = elaborate(surfaceNatRec(surfaceLambda('n', surfaceNat, surfaceNat), surfaceZero, surfaceLambda('n', surfaceNat, surfaceLambda('ih', surfaceNat, surfaceSucc(surfaceVar('ih')))), surfaceZero));
  assert.deepEqual(nr, natRec(lambda(Nat, Nat, 'n'), Zero, lambda(Nat, lambda(Nat, succ(variable(0, 'ih')), 'ih'), 'n'), Zero));
  const er = elaborate(surfaceEqRec(surfaceLambda('x', surfaceNat, surfaceNat), surfaceZero, surfaceZero, surfaceZero, surfaceRefl(surfaceNat, surfaceZero)));
  assert.deepEqual(er, eqRec(lambda(Nat, Nat, 'x'), Zero, Zero, Zero, refl(Nat, Zero)));
});

test('elaborated terms pass Kernel inference and checking', () => {
  const identity = elaborate(surfaceLambda('x', surfaceNat, surfaceVar('x')));
  assert.deepEqual(infer([], identity), pi(Nat, Nat, 'x'));
  const nested = elaborate(surfaceLambda('x', surfaceNat, surfaceLambda('y', surfaceNat, surfaceVar('x'))));
  check([], nested, pi(Nat, pi(Nat, Nat, 'y'), 'x'));
});
