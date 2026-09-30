import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { swapComponentsProof, swapComponentsType, swapFstProof, swapFstType, swapSndProof, swapSndType, xAxisSwapProof, xAxisSwapType, yAxisSwapProof, yAxisSwapType } from '../src/library/geometry-projections';

test('coordinate swap exchanges arbitrary axis points', () => {
  check([], xAxisSwapProof, xAxisSwapType);
  check([], yAxisSwapProof, yAxisSwapType);
  check([], swapComponentsProof, swapComponentsType);
  check([], swapFstProof, swapFstType);
  check([], swapSndProof, swapSndType);
});
