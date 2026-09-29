import test from "node:test";
import assert from "node:assert/strict";
import { RealProofEngine } from "../src/ui/proof-engine";
import { MAX_PROOF_SCRIPT_COMMANDS, MAX_PROOF_SCRIPT_LENGTH, parseProofScript } from "../src/ui/proof-script";
import { TacticSession } from "../src/proof/tactic";
import { Nat } from "../src/syntax/ast";

test("proof scripts keep physical source lines across comments and newline styles", () => {
  assert.deepEqual(parseProofScript("-- Header\r\n\rintro -- introduce n\nrfl\r\n"), [
    { line: 3, tactic: "intro" },
    { line: 4, tactic: "rfl" },
  ]);
});

test("empty and comment-only scripts reject without changing the proof", () => {
  for (const source of ["", " \r\n\t", "-- Nothing to execute\n  -- Another comment"]) {
    const engine = new RealProofEngine();
    const initial = engine.loadTheorem("identity");
    const result = engine.runScript(source);
    assert.equal(result.kind, "error");
    assert.match(result.message, /at least one tactic/);
    assert.deepEqual(result.state, initial);
    assert.deepEqual(engine.tacticHistory(), []);
  }
});

test("scripts execute dependent tactics and complete through the Kernel", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("identity");
  const result = engine.runScript("-- Identity\nintro\nrfl -- close the equality\n");
  assert.equal(result.kind, "success");
  assert.equal(result.state.completed, true);
  assert.equal(result.message, "Proof accepted");
  if (result.kind === "success") assert.equal(result.commandsExecuted, 2);
  assert.deepEqual(engine.tacticHistory(), ["intro", "rfl"]);
});

test("partial scripts continue from the current session and remain interactive", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("assumption");
  assert.equal(engine.runTactic("intro").kind, "success");
  const partial = engine.runScript("intro");
  assert.equal(partial.kind, "success");
  assert.equal(partial.state.completed, false);
  assert.equal(partial.state.goals[0].context.length, 2);
  assert.deepEqual(engine.tacticHistory(), ["intro", "intro"]);
  assert.equal(engine.runTactic("assumption").state.completed, true);
});

test("a failing script restores the prior goals and history with a physical line diagnostic", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("assumption");
  const before = engine.runTactic("intro").state;
  const result = engine.runScript("-- A comment\n\nintro\nexact Nat");
  assert.equal(result.kind, "error");
  if (result.kind === "error") assert.equal(result.line, 4);
  assert.match(result.message, /^Line 4: /);
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), ["intro"]);
  assert.equal(engine.runScript("intro\nassumption").state.completed, true);
});

test("a trailing command after apparent completion rolls back the entire script", () => {
  const engine = new RealProofEngine();
  const before = engine.loadTheorem("identity");
  const result = engine.runScript("intro\nrfl\n-- No goals remain\nrfl");
  assert.equal(result.kind, "error");
  assert.match(result.message, /^Line 4: There are no goals left/);
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), []);
  assert.equal(engine.runScript("intro\nrfl").state.completed, true);
});

test("scripts on a completed theorem leave its accepted history intact", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("zero");
  const before = engine.runTactic("rfl").state;
  const result = engine.runScript("rfl");
  assert.equal(result.kind, "error");
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), ["rfl"]);
});

test("an induction script solves both generated goals", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("add_zero");
  const result = engine.runScript("intro\ninduction n\nrfl\nrewrite IH\nrfl");
  assert.equal(result.kind, "success", result.message);
  assert.equal(result.state.completed, true);
  assert.deepEqual(engine.tacticHistory(), ["intro", "induction n", "rfl", "rewrite IH", "rfl"]);
});

test("failure after solving one induction case restores focus and both cases", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("add_zero");
  const before = engine.runScript("intro\ninduction n").state;
  const display = engine.displayProofState();
  const result = engine.runScript("rfl\nexact Nat");
  assert.equal(result.kind, "error");
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.displayProofState(), display);
  assert.deepEqual(engine.tacticHistory(), ["intro", "induction n"]);
  assert.equal(engine.runScript("rfl\nrewrite IH\nrfl").state.completed, true);
});

test("proof extraction failures roll back even after the final goal was removed", (t) => {
  const engine = new RealProofEngine();
  const before = engine.loadTheorem("identity");
  const proof = t.mock.method(TacticSession.prototype, "proof", () => { throw new Error("Kernel rejected generated proof"); });
  const result = engine.runScript("intro\nrfl");
  assert.equal(result.kind, "error");
  assert.match(result.message, /^Line 2: Kernel rejected/);
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), []);
  proof.mock.restore();
  assert.equal(engine.runScript("intro\nrfl").state.completed, true);
});

test("a well-typed proof of the wrong theorem cannot commit script completion", (t) => {
  const engine = new RealProofEngine();
  const before = engine.loadTheorem("zero");
  // Simulate a faulty tactic compiler returning a term that is well typed,
  // but does not inhabit the original theorem. The script must check both.
  t.mock.method(TacticSession.prototype, "proof", () => Nat);
  const result = engine.runScript("rfl");
  assert.equal(result.kind, "error");
  assert.match(result.message, /^Line 1: /);
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), []);
});

test("source length and command count limits are checked before execution", (t) => {
  const engine = new RealProofEngine();
  const before = engine.loadTheorem("identity");
  const run = t.mock.method(engine, "runTactic");
  const tooLong = engine.runScript("intro\n--" + "x".repeat(MAX_PROOF_SCRIPT_LENGTH));
  assert.equal(tooLong.kind, "error");
  assert.match(tooLong.message, /65536 characters/);
  const tooMany = engine.runScript("-- Header\n" + Array(MAX_PROOF_SCRIPT_COMMANDS + 1).fill("intro").join("\n"));
  assert.equal(tooMany.kind, "error");
  assert.match(tooMany.message, /^Line 258: .*256 tactics/);
  assert.equal(run.mock.callCount(), 0);
  assert.deepEqual(tooMany.state, before);
  assert.deepEqual(engine.tacticHistory(), []);
});

test("the documented script limits are inclusive", () => {
  assert.equal(parseProofScript("rfl\n--" + "x".repeat(MAX_PROOF_SCRIPT_LENGTH - 6)).length, 1);
  assert.equal(parseProofScript(Array(MAX_PROOF_SCRIPT_COMMANDS).fill("intro").join("\n")).length, MAX_PROOF_SCRIPT_COMMANDS);
});

test("syntax errors do not run code or commit earlier lines", () => {
  const engine = new RealProofEngine();
  const before = engine.loadTheorem("identity");
  const result = engine.runScript("intro\nconsole.log('hello')");
  assert.equal(result.kind, "error");
  assert.match(result.message, /^Line 2: Unknown tactic:/);
  assert.deepEqual(result.state, before);
  assert.deepEqual(engine.tacticHistory(), []);
});

test("returned script states and history do not expose mutable session data", () => {
  const engine = new RealProofEngine();
  engine.loadTheorem("identity");
  const partial = engine.runScript("intro");
  partial.state.goals[0].target = "changed";
  partial.state.goals[0].context[0].name = "changed";
  engine.tacticHistory().push("changed");
  assert.equal(engine.runScript("rfl").state.completed, true);
  assert.deepEqual(engine.tacticHistory(), ["intro", "rfl"]);
});

test("loading a theorem permits replaying the same successful source", () => {
  const engine = new RealProofEngine();
  const source = "intro\nrfl";
  for (let replay = 0; replay < 2; replay++) {
    engine.loadTheorem("identity");
    assert.equal(engine.runScript(source).state.completed, true);
    assert.deepEqual(engine.tacticHistory(), ["intro", "rfl"]);
  }
});


test("failed scripts create no undo steps before any manual tactic", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("identity");
  const rejected = engine.runScript("intro\nexact Nat");
  assert.equal(rejected.kind, "error");
  assert.deepEqual(rejected.state, initial);
  assert.equal(engine.canUndo(), false);
  assert.equal(engine.undo().kind, "error");
});

test("failed scripts preserve earlier manual undo steps without retaining intermediate steps", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("assumption");
  const before = engine.runTactic("intro").state;
  const rejected = engine.runScript("intro\nexact Nat");
  assert.equal(rejected.kind, "error");
  assert.deepEqual(rejected.state, before);
  assert.deepEqual(engine.tacticHistory(), ["intro"]);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
});

test("successful scripts keep individual undo steps and mix with manual tactics", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("assumption");
  const first = engine.runTactic("intro").state;
  assert.equal(engine.runScript("intro\nassumption").state.completed, true);
  const reopened = engine.undo();
  assert.equal(reopened.state.completed, false);
  assert.equal(reopened.state.goals[0].context.length, 2);
  assert.deepEqual(engine.tacticHistory(), ["intro", "intro"]);
  assert.equal(engine.runTactic("assumption").state.completed, true);
  assert.deepEqual(engine.undo().state, reopened.state);
  assert.deepEqual(engine.undo().state, first);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
});

test("a failed batch after induction preserves the focus and all prior undo snapshots", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("add_zero");
  const introduced = engine.runTactic("intro").state;
  const cases = engine.runTactic("induction n").state;
  const display = engine.displayProofState();
  assert.equal(engine.runScript("rfl\nexact Nat").kind, "error");
  assert.deepEqual(engine.displayProofState(), display);
  assert.deepEqual(engine.runTactic("rfl").state.goals.map(goal => goal.id), [cases.goals[1].id]);
  assert.deepEqual(engine.undo().state, cases);
  assert.deepEqual(engine.undo().state, introduced);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
});

test("trailing commands after script completion leave prior undo history intact", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("identity");
  const before = engine.runTactic("intro").state;
  const rejected = engine.runScript("rfl\nrfl");
  assert.equal(rejected.kind, "error");
  assert.deepEqual(rejected.state, before);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
});

test("final Kernel failures restore undo history after successful script prefixes", (t) => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("assumption");
  const before = engine.runTactic("intro").state;
  const proof = t.mock.method(TacticSession.prototype, "proof", () => { throw new Error("Injected Kernel failure"); });
  const rejected = engine.runScript("intro\nassumption");
  assert.equal(rejected.kind, "error");
  assert.deepEqual(rejected.state, before);
  assert.deepEqual(engine.tacticHistory(), ["intro"]);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
  proof.mock.restore();
  assert.equal(engine.runScript("intro\nintro\nassumption").state.completed, true);
});

test("a proof of a different theorem rolls back every script undo step", (t) => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("identity");
  t.mock.method(TacticSession.prototype, "proof", () => Nat);
  const rejected = engine.runScript("intro\nrfl");
  assert.equal(rejected.kind, "error");
  assert.deepEqual(rejected.state, initial);
  assert.deepEqual(engine.tacticHistory(), []);
  assert.equal(engine.canUndo(), false);
});

test("preflight errors and theorem navigation preserve the documented undo boundaries", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("identity");
  const introduced = engine.runTactic("intro").state;
  for (const source of ["-- No commands", "rfl\n--" + "x".repeat(MAX_PROOF_SCRIPT_LENGTH)]) {
    assert.deepEqual(engine.runScript(source).state, introduced);
    assert.equal(engine.canUndo(), true);
  }
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
  assert.equal(engine.runScript("intro\nrfl").state.completed, true);
  engine.loadTheorem("zero");
  assert.equal(engine.canUndo(), false);
  assert.deepEqual(engine.tacticHistory(), []);
});


test("a final batch validation error removes undo steps already accepted by each tactic", (t) => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("assumption");
  const before = engine.runTactic("intro").state;
  const extract = TacticSession.prototype.proof;
  let checks = 0;
  t.mock.method(TacticSession.prototype, "proof", function (this: TacticSession) {
    if (++checks === 2) throw new Error("Injected batch validation failure");
    return extract.call(this);
  });
  const rejected = engine.runScript("intro\nassumption");
  assert.equal(checks, 2);
  assert.equal(rejected.kind, "error");
  assert.match(rejected.message, /^Line 2: Injected batch validation failure/);
  assert.deepEqual(rejected.state, before);
  assert.deepEqual(engine.tacticHistory(), ["intro"]);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
});

test("a rejected script after Undo cannot resurrect discarded undo steps", () => {
  const engine = new RealProofEngine();
  const initial = engine.loadTheorem("assumption");
  const first = engine.runTactic("intro").state;
  engine.runTactic("intro");
  assert.deepEqual(engine.undo().state, first);
  assert.equal(engine.runScript("intro\nexact Nat").kind, "error");
  assert.deepEqual(engine.tacticHistory(), ["intro"]);
  assert.deepEqual(engine.undo().state, initial);
  assert.equal(engine.canUndo(), false);
  assert.equal(engine.undo().kind, "error");
});
