import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translate, translateType, translateOriginProof, translateOriginType, translateUnitProof, translateUnitType, translateConcreteProof, translateConcreteType, translateZeroProof, translateZeroType, translateFstProof, translateFstType, translateSndProof, translateSndType, translateEtaProof, translateEtaType } from '../src/library/geometry-transform';

test('coordinate translation and concrete invariants are kernel checked', () => {
  check([], translate, translateType);
  check([], translateOriginProof, translateOriginType);
  check([], translateUnitProof, translateUnitType);
  check([], translateConcreteProof, translateConcreteType);
  check([], translateZeroProof, translateZeroType);
  check([], translateFstProof, translateFstType);
  check([], translateSndProof, translateSndType);
  check([], translateEtaProof, translateEtaType);
});
