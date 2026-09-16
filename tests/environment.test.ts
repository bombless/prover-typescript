import assert from 'node:assert/strict';
import test from 'node:test';
import { GlobalEnvironment, EnvironmentError } from '../src/environment/environment';
import { Zero, Nat } from '../src/syntax/ast';

test('environment defines and looks up terms', () => {
  const environment = new GlobalEnvironment();
  assert.equal(environment.lookup('missing'), undefined);
  environment.define('zero', Zero);
  assert.equal(environment.lookup('zero'), Zero);
});

test('environment rejects duplicate definitions', () => {
  const environment = new GlobalEnvironment();
  environment.define('zero', Zero);
  assert.throws(() => environment.define('zero', Nat), EnvironmentError);
  assert.equal(environment.lookup('zero'), Zero);
});
