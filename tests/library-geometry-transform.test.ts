import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translate, translateType, translateOriginProof, translateOriginType, translateUnitProof, translateUnitType } from '../src/library/geometry-transform';

test('coordinate translation and concrete invariants are kernel checked', () => {
  check([], translate, translateType);
  check([], translateOriginProof, translateOriginType);
  check([], translateUnitProof, translateUnitType);
});
