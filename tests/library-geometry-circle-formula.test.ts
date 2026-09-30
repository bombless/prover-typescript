import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import { originCircleMembershipProof, originCircleMembershipType } from '../src/library/geometry-circle';

test('origin circle membership is kernel checked', () => check([], originCircleMembershipProof, originCircleMembershipType));
