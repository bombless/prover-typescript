import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { translatedLineProof, translatedLineType, rotatedLineDirectionProof, rotatedLineDirectionType, transformedLineProof, transformedLineType } from '../src/library/geometry-line-composition-more';

test('translated concrete line base computes', () => check([], translatedLineProof, translatedLineType));
test('rotated concrete line direction computes', () => check([], rotatedLineDirectionProof, rotatedLineDirectionType));
test('transformed line structure computes', () => check([], transformedLineProof, transformedLineType));
