import test from "node:test";
import assert from "node:assert/strict";
import { loadCourse } from "./helpers/ui-harness";

test("tactic input has an explicit visible label and no missing feedback reference", () => {
  const { root } = loadCourse();
  assert.match(root.html, /<label[^>]+for="tactic-input">[^<]*\bTactic\b/);
  assert.equal(root.control("tactic-input").getAttribute("aria-describedby"), null);
  assert.equal(root.control("tactic-input").getAttribute("aria-invalid"), "false");
});

test("rejected tactics associate the escaped alert and return focus to the input", () => {
  const { root } = loadCourse();
  const command = "<img src=x onerror=alert(1)>";
  root.control("tactic-input").value = command; root.control("apply-button").emit("click");
  const input = root.control("tactic-input");
  assert.equal(input.getAttribute("aria-describedby"), "tactic-feedback");
  assert.equal(root.control("tactic-feedback").getAttribute("role"), "alert");
  assert.equal(input.getAttribute("aria-invalid"), "true");
  assert.equal(root.focused, input);
  assert.ok(!root.html.includes("<img"));
});

test("an intermediate successful tactic keeps the input focused", () => {
  const { root } = loadCourse(); root.selectExercise("numbers.identity");
  root.control("tactic-input").value = "intro"; root.control("apply-button").emit("click");
  assert.equal(root.focused, root.control("tactic-input"));
  assert.equal(root.control("tactic-input").getAttribute("aria-describedby"), null);
});

test("accepting a proof transfers focus to the completion summary", () => {
  const { root } = loadCourse();
  root.control("tactic-input").value = "rfl"; root.control("apply-button").emit("click");
  const summary = root.control("proof-completion");
  assert.equal(summary.getAttribute("tabindex"), "-1");
  assert.equal(summary.getAttribute("role"), "status");
  assert.match(summary.textContent, /Proof accepted/);
  assert.equal(root.focused, summary);
  assert.equal(root.querySelector("#tactic-input"), undefined);
  assert.ok(root.querySelector("#next-button"));
});
