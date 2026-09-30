import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { dot2, dot2Type, normSq, normSqType, zeroNormSqProof, zeroNormSqType, zeroDotProof, zeroDotType, axisXNormProof, axisXNormType, axisYNormProof, axisYNormType, xAxisDotProof, xAxisDotType, yAxisDotProof, yAxisDotType, xAxisNormGeneralProof, xAxisNormGeneralType, yAxisNormGeneralProof, yAxisNormGeneralType } from '../src/library/geometry-metrics';

test('coordinate metrics are kernel checked', () => {
  check([], dot2, dot2Type);
  check([], normSq, normSqType);
  check([], zeroNormSqProof, zeroNormSqType);
  check([], zeroDotProof, zeroDotType);
  check([], axisXNormProof, axisXNormType);
  check([], axisYNormProof, axisYNormType);
});
test('unit x-axis dot product returns x-coordinate', () => check([], xAxisDotProof, xAxisDotType));
test('unit y-axis dot product returns y-coordinate', () => check([], yAxisDotProof, yAxisDotType));
test('general axis squared norms are kernel checked', () => {
  check([], xAxisNormGeneralProof, xAxisNormGeneralType);
  check([], yAxisNormGeneralProof, yAxisNormGeneralType);
});
