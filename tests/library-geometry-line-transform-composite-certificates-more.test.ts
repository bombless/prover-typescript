import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-line-transform-composite-certificates-more';

test('composite line structure', () => check([], c.compositeLineProof, c.compositeLineType));
test('composite line base', () => check([], c.compositeLineBaseProof, c.compositeLineBaseType));
test('composite line direction', () => check([], c.compositeLineDirectionProof, c.compositeLineDirectionType));
