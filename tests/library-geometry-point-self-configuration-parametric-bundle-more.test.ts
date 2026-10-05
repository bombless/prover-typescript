import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-point-self-configuration-parametric-bundle-more';

test('parametric point self configuration bundle', () => check([], c.pointSelfConfigurationProof, c.pointSelfConfigurationType));
