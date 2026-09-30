import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateXAxisToYAxisProof,rotateXAxisToYAxisType,rotateConcreteAxisProof,rotateConcreteAxisType,scaleConcreteAxisProof,scaleConcreteAxisType,scaleConcreteYAxisProof,scaleConcreteYAxisType } from '../src/library/geometry-axis-transform-more';
test('rotation maps unit x-axis to unit y-axis',()=>check([],rotateXAxisToYAxisProof,rotateXAxisToYAxisType));
test('rotation maps a concrete x-axis vector to y-axis',()=>check([],rotateConcreteAxisProof,rotateConcreteAxisType));
test('scaling preserves a concrete x-axis',()=>check([],scaleConcreteAxisProof,scaleConcreteAxisType));
test('scaling preserves a concrete y-axis',()=>check([],scaleConcreteYAxisProof,scaleConcreteYAxisType));
