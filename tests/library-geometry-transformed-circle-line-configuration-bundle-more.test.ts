import test from 'node:test';
import { check } from '../src/kernel/typecheck';
import * as c from '../src/library/geometry-transformed-circle-line-configuration-bundle-more';

test('transformed circle-line configurations are kernel checked', () => {
  check([], c.transformedConfigurationProof, c.transformedConfigurationType);
  check([], c.transformedConfigurationCenterProof, c.transformedConfigurationCenterType);
});
