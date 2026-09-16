import test from "node:test";
import assert from "node:assert/strict";
import { MockProofEngine } from "../src/ui/proof-engine";

test("UI proof view loads an initial theorem without exposing engine internals", () => {
  const engine = new MockProofEngine();
  const state = engine.loadTheorem("n_plus_zero");
  assert.equal(state.theoremName, "n_plus_zero");
  assert.equal(state.completed, false);
  assert.deepEqual(state.goals[0], { id: "n-plus-zero-1", target: "n + 0 = n", context: [{ name: "n", type: "Nat" }] });
});

test("theorem selection resets the mock proof", () => {
  const engine = new MockProofEngine();
  engine.runTactic("intro");
  const state = engine.loadTheorem("zero");
  assert.equal(state.theoremName, "zero");
  assert.equal(state.goals.length, 1);
});

test("valid mock tactic completes a solvable theorem", () => {
  const engine = new MockProofEngine();
  engine.loadTheorem("zero");
  const result = engine.runTactic("rfl");
  assert.equal(result.kind, "success");
  assert.equal(result.state.completed, true);
  assert.equal(result.message, "Mock proof completed");
});

test("invalid mock tactic returns a user-facing error and keeps the goal", () => {
  const engine = new MockProofEngine();
  const before = engine.loadTheorem("n_plus_zero");
  const result = engine.runTactic("rfl");
  assert.equal(result.kind, "error");
  assert.equal(result.message, "rfl cannot solve this goal in mock mode.");
  assert.deepEqual(result.state, before);
});

test("empty tactic is rejected without changing state", () => {
  const engine = new MockProofEngine();
  const before = engine.loadTheorem("zero");
  const result = engine.runTactic("  ");
  assert.equal(result.kind, "error");
  assert.equal(result.message, "Enter a tactic before applying it.");
  assert.deepEqual(result.state, before);
});

test("mock engine supports multiple goals and advances one at a time", () => {
  const engine = new MockProofEngine();
  const state = engine.loadTheorem("multi_goal");
  assert.equal(state.goals.length, 2);
  assert.equal(state.goals[0].id, "multi-1");
  const result = engine.runTactic("rfl");
  assert.equal(result.kind, "error");
  assert.equal(result.state.goals.length, 2);
});

test("returned proof states are detached from engine state", () => {
  const engine = new MockProofEngine();
  const state = engine.loadTheorem("zero");
  state.goals[0].target = "mutated";
  assert.equal(engine.runTactic("rfl").kind, "success");
});
