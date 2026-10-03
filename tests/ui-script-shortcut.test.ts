import test from "node:test";
import assert from "node:assert/strict";
import { loadCourse } from "./helpers/ui-harness";

for (const modifier of ["ctrlKey", "metaKey"]) {
  test(`${modifier}+Enter runs the script and focuses accepted proof feedback`, () => {
    const { root } = loadCourse(); root.selectExercise("numbers.identity");
    const input = root.control("proof-script"); input.value = "intro\nrfl"; input.focus();
    const event = input.emit("keydown", { key: "Enter", [modifier]: true });
    assert.equal(event.prevented, true);
    assert.equal(root.querySelector("#proof-script"), undefined);
    assert.equal(root.focused, root.control("proof-completion"));
    assert.match(root.html, /Accepted by the real Kernel/);
  });
}

test("clicking Run script also transfers focus after proof completion", () => {
  const { root } = loadCourse(); root.control("proof-script").value = "rfl";
  root.control("run-script-button").emit("click");
  assert.equal(root.focused, root.control("proof-completion"));
});

test("plain Enter, other keys, modifier combinations, repeats and IME leave the script untouched", () => {
  for (const fields of [
    { key: "Enter" }, { key: "a", ctrlKey: true }, { key: "Enter", ctrlKey: true, altKey: true },
    { key: "Enter", metaKey: true, shiftKey: true }, { key: "Enter", ctrlKey: true, repeat: true },
    { key: "Enter", ctrlKey: true, isComposing: true }, { key: "Enter", metaKey: true, keyCode: 229 },
  ]) {
    const { root } = loadCourse(); const input = root.control("proof-script"); input.value = "rfl"; input.focus();
    assert.equal(input.emit("keydown", fields).prevented, false);
    assert.equal(root.control("proof-script"), input);
    assert.equal(input.value, "rfl"); assert.equal(root.focused, input);
  }
});

test("shortcut failures roll back the complete script and retain the draft for correction", () => {
  const { root } = loadCourse(); root.selectExercise("numbers.identity");
  const source = "intro\nrfl\nunknown";
  root.control("proof-script").value = source;
  root.control("proof-script").emit("keydown", { key: "Enter", ctrlKey: true });
  assert.match(root.html, /Line 3: There are no goals left/);
  assert.match(root.html, /No tactics applied yet/);
  assert.equal(root.control("proof-script").value, source);
  assert.equal(root.focused, root.control("proof-script"));
});

test("an intermediate shortcut run keeps the script input usable and exposes its shortcuts", () => {
  const { root } = loadCourse(); root.selectExercise("numbers.identity");
  const input = root.control("proof-script"); input.value = "intro";
  assert.equal(input.getAttribute("aria-keyshortcuts"), "Control+Enter Meta+Enter");
  assert.match(root.html, /Ctrl\+Enter or Cmd\+Enter/);
  input.emit("keydown", { key: "Enter", metaKey: true });
  assert.equal(root.control("proof-script").value, "");
  assert.equal(root.focused, root.control("proof-script"));
  root.control("tactic-input").value = "rfl"; root.control("apply-button").emit("click");
  assert.equal(root.focused, root.control("proof-completion"));
});
