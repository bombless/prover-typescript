import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
 xAxisParallelProof,xAxisParallelType,yAxisParallelProof,yAxisParallelType,
 axesPerpendicularProof,axesPerpendicularType,axisVectorsPerpendicularProof,axisVectorsPerpendicularType
} from '../src/library/geometry-axis-relations-more';
test('x-axis vectors are parallel',()=>check([],xAxisParallelProof,xAxisParallelType));
test('y-axis vectors are parallel',()=>check([],yAxisParallelProof,yAxisParallelType));
test('unit axes are perpendicular',()=>check([],axesPerpendicularProof,axesPerpendicularType));
test('axis vectors are perpendicular',()=>check([],axisVectorsPerpendicularProof,axisVectorsPerpendicularType));
