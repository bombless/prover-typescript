import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { andSelf, andSelfType, orSelf, orSelfType, andTrueProof, andTrueType, orFalseProof, orFalseType } from '../src/library/bool-absorption';

test('boolean absorption-style functions and closed laws are checked', () => {
  check([], andSelf, andSelfType);
  check([], orSelf, orSelfType);
  check([], andTrueProof, andTrueType);
  check([], orFalseProof, orFalseType);
});
