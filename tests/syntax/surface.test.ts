import assert from 'node:assert/strict';
import test from 'node:test';
import {
  SurfaceTerm,
  surfaceApp,
  surfaceEq,
  surfaceLambda,
  surfaceNat,
  surfacePi,
  surfaceRefl,
  surfaceSucc,
  surfaceVar,
  surfaceZero,
} from '../../src/syntax/surface';
import { infer } from '../../src/kernel/typecheck';
import { variable, Nat, lambda } from '../../src/syntax/ast';

test('Surface variable is name-based syntax data', () => {
  const term = surfaceVar('x');
  assert.deepEqual(term, { kind: 'Var', name: 'x' });
});

test('Surface lambda preserves its binder name and body', () => {
  const term = surfaceLambda('x', surfaceNat, surfaceVar('x'));
  assert.deepEqual(term, {
    kind: 'Lambda',
    name: 'x',
    domain: { kind: 'Nat' },
    body: { kind: 'Var', name: 'x' },
  });
});

test('Nested Surface lambdas keep distinct variable names', () => {
  const term = surfaceLambda(
    'x',
    surfaceNat,
    surfaceLambda('y', surfaceNat, surfaceVar('x')),
  );
  assert.equal(term.kind, 'Lambda');
  assert.equal(term.body.kind, 'Lambda');
  assert.equal(term.body.name, 'y');
  assert.deepEqual(term.body.body, { kind: 'Var', name: 'x' });
  assert.notDeepEqual(term.body.body, { kind: 'Var', name: 'y' });
});

test('Surface application constructs function application', () => {
  const term = surfaceApp(surfaceVar('f'), surfaceVar('x'));
  assert.deepEqual(term, {
    kind: 'App',
    fn: { kind: 'Var', name: 'f' },
    arg: { kind: 'Var', name: 'x' },
  });
});

test('Surface Pi constructs a named dependent function type', () => {
  const term = surfacePi('x', surfaceNat, surfaceNat);
  assert.deepEqual(term, {
    kind: 'Pi',
    name: 'x',
    domain: { kind: 'Nat' },
    body: { kind: 'Nat' },
  });
});

test('Surface Eq constructs an equality proposition', () => {
  const term = surfaceEq(surfaceNat, surfaceVar('x'), surfaceVar('y'));
  assert.deepEqual(term, {
    kind: 'Eq',
    type: { kind: 'Nat' },
    left: { kind: 'Var', name: 'x' },
    right: { kind: 'Var', name: 'y' },
  });
});

test('Surface Nat terms construct Nat, Zero, and Succ', () => {
  assert.deepEqual(surfaceNat, { kind: 'Nat' });
  assert.deepEqual(surfaceZero, { kind: 'Zero' });
  assert.deepEqual(surfaceSucc(surfaceVar('x')), {
    kind: 'Succ',
    value: { kind: 'Var', name: 'x' },
  });
});

test('Surface Refl preserves its explicit type and value', () => {
  const term = surfaceRefl(surfaceNat, surfaceZero);
  assert.deepEqual(term, {
    kind: 'Refl',
    type: { kind: 'Nat' },
    value: { kind: 'Zero' },
  });
});

test('Surface AST is a distinct data type from Core Term', () => {
  const surface: SurfaceTerm = surfaceVar('x');
  const core = variable(0, 'x');
  assert.equal(surface.kind, 'Var');
  assert.equal(core.kind, 'Var');
  assert.notDeepEqual(surface, core);

  const coreLambda = lambda(Nat, variable(0));
  assert.equal(infer([], coreLambda).kind, 'Pi');
});

test('Surface AST contains no Kernel-facing de Bruijn index', () => {
  const term = surfaceLambda('x', surfaceNat, surfaceVar('x'));
  assert.equal('index' in term, false);
  assert.equal('index' in term.body, false);
});
