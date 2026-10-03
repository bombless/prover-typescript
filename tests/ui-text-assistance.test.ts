import test from "node:test";
import assert from "node:assert/strict";
import { loadCourse, type TestRoot } from "./helpers/ui-harness";

function assertCodeInputHints(root: TestRoot): void {
  for (const id of ["tactic-input", "proof-script"]) {
    const input = root.control(id);
    assert.equal(input.getAttribute("spellcheck"), "false", `${id}: spellcheck`);
    for (const attribute of ["autocorrect", "autocapitalize", "autocomplete"]) {
      assert.equal(input.getAttribute(attribute), "off", `${id}: ${attribute}`);
    }
  }
}

test("code-entry fields explicitly request unmodified browser text entry", () => {
  assertCodeInputHints(loadCourse().root);
});

test("rejected scripts preserve code text and the browser text-entry hints", () => {
  const { root } = loadCourse();
  const source = "exact Missing_Theorem";
  root.control("proof-script").value = source;
  root.control("run-script-button").emit("click");
  assert.equal(root.control("proof-script").value, source);
  assertCodeInputHints(root);
});

test("text-entry hints survive intermediate proof renders and exercise changes", () => {
  const { root } = loadCourse(); root.selectExercise("numbers.identity");
  root.control("tactic-input").value = "intro";
  root.control("apply-button").emit("click");
  assertCodeInputHints(root);
  root.selectExercise("numbers.zero_eq_zero"); assertCodeInputHints(root);
});
