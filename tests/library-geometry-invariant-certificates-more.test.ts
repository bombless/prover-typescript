import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateNormCertificateProof,rotateNormCertificateType,reflectNormCertificateProof,reflectNormCertificateType,scaleNormCertificateProof,scaleNormCertificateType,translatedTriangleVertexProof,translatedTriangleVertexType } from '../src/library/geometry-invariant-certificates-more';
test('rotation preserves a concrete norm-square',()=>check([],rotateNormCertificateProof,rotateNormCertificateType));
test('reflection preserves a concrete norm-square',()=>check([],reflectNormCertificateProof,reflectNormCertificateType));
test('scaling computes the concrete norm-square factor',()=>check([],scaleNormCertificateProof,scaleNormCertificateType));
test('translated triangle vertex computes concretely',()=>check([],translatedTriangleVertexProof,translatedTriangleVertexType));
