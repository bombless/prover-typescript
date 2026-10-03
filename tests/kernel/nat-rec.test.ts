import test from 'node:test';
import assert from 'node:assert/strict';
import { Nat, Zero, Type, variable, lambda, pi, app, succ, natRec, eq, refl, natLiteral } from '../../src/syntax/ast';
import { definitionalEqual, normalize, shift } from '../../src/kernel/reduction';
import { check, infer, TypeError } from '../../src/kernel/typecheck';

const natMotive = lambda(Nat, Nat, 'n');
const natStep = lambda(Nat, lambda(Nat, succ(variable(0, 'ih')), 'ih'), 'n');

function rec(motive: ReturnType<typeof lambda>, zeroCase: Parameters<typeof natRec>[1], succCase: Parameters<typeof natRec>[2], scrutinee: Parameters<typeof natRec>[3]) {
  return natRec(motive, zeroCase, succCase, scrutinee);
}

test('Nat.rec zero case reduces to zeroCase', () => {
  const zeroCase = natLiteral(7);
  const term = rec(natMotive, zeroCase, natStep, Zero);

  assert.ok(definitionalEqual(normalize(term), zeroCase));
});

test('Nat.rec successor case reduces to s n (Nat.rec ... n)', () => {
  const n = variable(0, 'n');
  const ctx = [Nat] as const;
  const term = rec(natMotive, Zero, natStep, succ(n));
  const expected = app(app(natStep, n), rec(natMotive, Zero, natStep, n));

  assert.ok(definitionalEqual(normalize(term), normalize(expected)));
  assert.ok(definitionalEqual(infer(ctx, term), Nat));
});

test('Nat.rec concrete recursion computes 0 and 3', () => {
  const zero = rec(natMotive, Zero, natStep, Zero);
  const three = rec(natMotive, Zero, natStep, natLiteral(3));

  assert.ok(definitionalEqual(normalize(zero), natLiteral(0)));
  assert.ok(definitionalEqual(normalize(three), natLiteral(3)));
});

test('Nat.rec supports a genuinely dependent motive', () => {
  // P(n) = Eq Nat n n.  In λn. λih. ..., #0 is ih and #1 is n.
  const motive = lambda(Nat, eq(Nat, variable(0), variable(0)), 'n');
  const zeroCase = refl(Nat, Zero);
  const succCase = lambda(
    Nat,
    lambda(app(motive, variable(0, 'n')), refl(Nat, succ(variable(1, 'n'))), 'ih'),
    'n'
  );
  const term = rec(motive, zeroCase, succCase, natLiteral(2));
  const expectedType = app(motive, natLiteral(2));

  check([], term, expectedType);
  assert.ok(definitionalEqual(infer([], term), expectedType));
  assert.ok(definitionalEqual(normalize(term), refl(Nat, natLiteral(2))));
});

test('Nat.rec successor binder order is #0 = ih and #1 = n', () => {
  const motive = lambda(Nat, eq(Nat, variable(0), variable(0)), 'n');
  const zeroCase = refl(Nat, Zero);
  const correctSuccCase = lambda(
    Nat,
    lambda(app(motive, variable(0)), refl(Nat, succ(variable(1))), 'ih'),
    'n'
  );
  const wrongSuccCase = lambda(
    Nat,
    lambda(app(motive, variable(0)), refl(Nat, succ(variable(0))), 'ih'),
    'n'
  );
  const expectedType = pi(
    Nat,
    pi(app(motive, variable(0)), app(motive, succ(variable(1)))),
    'n'
  );

  check([], correctSuccCase, expectedType);
  assert.throws(() => check([], wrongSuccCase, expectedType), (error: unknown) => error instanceof TypeError);
});


test('Nat.rec itself has the expected dependent result type', () => {
  const motive = lambda(Nat, Nat, 'n');
  const term = rec(motive, Zero, natStep, variable(0, 'n'));
  const ctx = [Nat] as const;

  assert.ok(definitionalEqual(infer(ctx, term), Nat));
  assert.ok(definitionalEqual(infer([], motive), pi(Nat, Type)));
});

test('Nat.rec preserves an outer local in both successor motive positions', () => {
  // In the motive, #0 is the recursion argument and #1 is outer m.
  const motive = lambda(Nat, eq(Nat, variable(1, 'm'), variable(1, 'm')), 'n');
  const zeroCase = refl(Nat, variable(0, 'm'));
  const succCase = lambda(
    Nat,
    lambda(
      app(shift(motive, 1), variable(0, 'n')),
      // Under n and ih, outer m has crossed two binders and is #2.
      refl(Nat, variable(2, 'm')),
      'ih'
    ),
    'n'
  );
  const term = rec(motive, zeroCase, succCase, succ(Zero));
  const expected = eq(Nat, variable(0, 'm'), variable(0, 'm'));

  check([Nat], term, expected);
  assert.ok(definitionalEqual(infer([Nat], term), expected));
  assert.ok(definitionalEqual(normalize(term), zeroCase));
  check([Nat], normalize(term), expected);
});

test('Nat.rec rejects a successor proof that captures the predecessor as an outer local', () => {
  const motive = lambda(Nat, eq(Nat, variable(1, 'm'), variable(1, 'm')), 'n');
  const capturedSuccCase = lambda(
    Nat,
    lambda(
      app(shift(motive, 1), variable(0, 'n')),
      // This proves n = n, not the required m = m: #1 is n, not m.
      refl(Nat, variable(1, 'n')),
      'ih'
    ),
    'n'
  );
  const term = rec(motive, refl(Nat, variable(0, 'm')), capturedSuccCase, succ(Zero));

  assert.throws(() => infer([Nat], term), (error: unknown) => error instanceof TypeError && /Type mismatch/.test(error.message));
});

test('Nat.rec preserves outer locals when the motive also depends on the scrutinee', () => {
  // P(n) = (n + m = n + m), where addition is another ordinary Nat.rec.
  const sum = rec(natMotive, variable(1, 'm'), natStep, variable(0, 'n'));
  const motive = lambda(Nat, eq(Nat, sum, sum), 'n');
  const succValue = rec(natMotive, variable(2, 'm'), natStep, succ(variable(1, 'n')));
  const succCase = lambda(
    Nat,
    lambda(app(shift(motive, 1), variable(0, 'n')), refl(Nat, succValue), 'ih'),
    'n'
  );
  const term = rec(motive, refl(Nat, variable(0, 'm')), succCase, natLiteral(2));
  const expectedValue = succ(succ(variable(0, 'm')));
  const expected = eq(Nat, expectedValue, expectedValue);

  check([Nat], term, expected);
  assert.ok(definitionalEqual(infer([Nat], term), expected));
  check([Nat], normalize(term), expected);
});
