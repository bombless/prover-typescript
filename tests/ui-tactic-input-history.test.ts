import test from "node:test";
import assert from "node:assert/strict";
import { TacticInputHistory } from "../src/ui/tactic-input-history";
import { loadCourse } from "./helpers/ui-harness";

test("recall preserves an unfinished draft and visits commands in order", () => {
  const history = new TacticInputHistory();
  history.record("intro"); history.record("exact h");
  assert.equal(history.previous("apply "), "exact h");
  assert.equal(history.previous("ignored"), "intro");
  assert.equal(history.previous("ignored"), "intro");
  assert.equal(history.next(), "exact h");
  assert.equal(history.next(), "apply ");
  assert.equal(history.next(), null);
});

test("blank and consecutive duplicate commands do not fill recall history", () => {
  const history = new TacticInputHistory();
  assert.equal(history.previous("draft"), null);
  history.record("intro"); history.record("intro"); history.record("  ");
  assert.equal(history.previous("draft"), "intro");
  assert.equal(history.next(), "draft");
});

test("editing a recalled command starts a new draft", () => {
  const history = new TacticInputHistory(); history.record("exact h");
  history.previous("old draft"); history.resetRecall();
  assert.equal(history.previous("exact h2"), "exact h");
  assert.equal(history.next(), "exact h2");
});

test("only the latest hundred commands are retained", () => {
  const history = new TacticInputHistory();
  for (let index = 0; index < 120; index++) history.record(`exact h${index}`);
  let command: string | null = null;
  for (let index = 0; index < 120; index++) command = history.previous("");
  assert.equal(command, "exact h20");
});

test("actual tactic handlers recall rejected commands without executing them", () => {
  const { root } = loadCourse();
  root.control("tactic-input").value = "unknown";
  root.control("apply-button").emit("click");
  const input = root.control("tactic-input");
  input.value = "exact "; input.setSelectionRange(0, 0);
  assert.equal(input.emit("keydown", { key: "ArrowUp" }).prevented, true);
  assert.equal(input.value, "unknown");
  assert.match(root.html, /No tactics applied yet/);
  input.setSelectionRange(input.value.length, input.value.length);
  input.emit("keydown", { key: "ArrowDown" });
  assert.equal(input.value, "exact ");
});

test("recall leaves composition, selection, modifier keys, and mid-line navigation alone", () => {
  const { root } = loadCourse();
  root.control("tactic-input").value = "unknown"; root.control("apply-button").emit("click");
  const input = root.control("tactic-input"); input.value = "draft";
  for (const fields of [{ isComposing: true }, { keyCode: 229 }, { ctrlKey: true }, { metaKey: true }, { altKey: true }, { shiftKey: true }]) {
    input.setSelectionRange(0, 0);
    assert.equal(input.emit("keydown", { key: "ArrowUp", ...fields }).prevented, false);
    assert.equal(input.value, "draft");
  }
  for (const [start, end] of [[0, 2], [2, 2]]) {
    input.setSelectionRange(start, end);
    assert.equal(input.emit("keydown", { key: "ArrowUp" }).prevented, false);
    assert.equal(input.value, "draft");
  }
});

test("composing Enter does not apply a recalled or typed tactic", () => {
  const { root } = loadCourse(); const input = root.control("tactic-input"); input.value = "rfl";
  input.emit("keydown", { key: "Enter", isComposing: true });
  assert.match(root.html, /No tactics applied yet/);
  input.emit("keydown", { key: "Enter" });
  assert.match(root.html, /Accepted by the real Kernel/);
});


test("choosing a tactic tool establishes a fresh recall draft", () => {
  const { root } = loadCourse();
  root.control("tactic-input").value = "unknown"; root.control("apply-button").emit("click");
  const input = root.control("tactic-input"); input.setSelectionRange(0, 0);
  input.emit("keydown", { key: "ArrowUp" });
  const exact = root.controls.find((control) => control.dataset.tactic === "exact "); assert.ok(exact);
  exact.emit("click"); input.setSelectionRange(0, 0); input.emit("keydown", { key: "ArrowUp" });
  input.setSelectionRange(input.value.length, input.value.length); input.emit("keydown", { key: "ArrowDown" });
  assert.equal(input.value, "exact ");
});
