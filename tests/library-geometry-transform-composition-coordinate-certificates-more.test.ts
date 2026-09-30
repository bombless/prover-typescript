import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { rotateAfterTranslateFstType, rotateAfterTranslateFstProof, rotateAfterTranslateSndType, rotateAfterTranslateSndProof, scaleAfterRotateFstType, scaleAfterRotateFstProof, scaleAfterRotateSndType, scaleAfterRotateSndProof, scaleAfterTranslateFstType, scaleAfterTranslateFstProof, scaleAfterTranslateSndType, scaleAfterTranslateSndProof } from '../src/library/geometry-transform-composition-coordinate-certificates-more';

test('rotate after translate first coordinate formula', () => check([], rotateAfterTranslateFstProof, rotateAfterTranslateFstType));
test('rotate after translate second coordinate formula', () => check([], rotateAfterTranslateSndProof, rotateAfterTranslateSndType));
test('scale after rotate first coordinate formula', () => check([], scaleAfterRotateFstProof, scaleAfterRotateFstType));
test('scale after rotate second coordinate formula', () => check([], scaleAfterRotateSndProof, scaleAfterRotateSndType));
test('scale after translate first coordinate formula', () => check([], scaleAfterTranslateFstProof, scaleAfterTranslateFstType));
test('scale after translate second coordinate formula', () => check([], scaleAfterTranslateSndProof, scaleAfterTranslateSndType));
