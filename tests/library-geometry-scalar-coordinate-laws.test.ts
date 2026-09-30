import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { scaleFstProof, scaleFstType, scaleSndProof, scaleSndType, zeroScaleFstFormulaProof, zeroScaleFstFormulaType, zeroScaleFstProof, zeroScaleFstType, zeroScaleSndProof, zeroScaleSndType } from '../src/library/geometry-scalar';

test('scalar multiplication coordinate laws are kernel checked', () => {
  check([], scaleFstProof, scaleFstType);
  check([], scaleSndProof, scaleSndType);
  check([], zeroScaleFstProof, zeroScaleFstType);
  check([], zeroScaleSndProof, zeroScaleSndType);
  check([], zeroScaleFstFormulaProof, zeroScaleFstFormulaType);
});
