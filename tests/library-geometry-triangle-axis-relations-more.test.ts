import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import {
 triangleXAxisParallelProof,triangleXAxisParallelType,
 triangleMixedAxisPerpendicularProof,triangleMixedAxisPerpendicularType,
 triangleAxisCertificateProof,triangleAxisCertificateType
} from '../src/library/geometry-triangle-axis-relations-more';
test('triangle x-axis vertices satisfy parallel relation',()=>check([],triangleXAxisParallelProof,triangleXAxisParallelType));
test('triangle mixed axis vertices satisfy perpendicular relation',()=>check([],triangleMixedAxisPerpendicularProof,triangleMixedAxisPerpendicularType));
test('axis pair has a concrete cross certificate',()=>check([],triangleAxisCertificateProof,triangleAxisCertificateType));
