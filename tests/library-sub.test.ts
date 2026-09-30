import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { definitionalEqual } from '../src/kernel/reduction';
import { app, eq, Nat, refl } from '../src/syntax/ast';
import { numeral } from '../src/library/nat';
import { pred } from '../src/library/pred';
import { sub, subType } from '../src/library/sub';

test('subtraction skeleton is a well-typed recursive operation', () => check([], sub, subType));

test('truncated subtraction computes closed natural numbers', () => {
  for (const [a, b, expected] of [[0, 3, 0], [3, 1, 2], [1, 3, 0], [4, 2, 2]] as const) {
    const value = app(app(sub, numeral(a)), numeral(b));
    if (!definitionalEqual(value, numeral(expected))) throw new Error(`bad subtraction ${a}-${b}`);
    check([], refl(Nat, numeral(expected)), eq(Nat, value, numeral(expected)));
  }
});

test('subtraction concrete successor computation is kernel checked', () => {
  const value = app(app(sub, numeral(3)), numeral(1));
  const rhs = app(pred, app(app(sub, numeral(2)), numeral(1)));
  check([], refl(Nat, numeral(2)), require('../src/syntax/ast').eq(Nat, value, numeral(2)));
});
