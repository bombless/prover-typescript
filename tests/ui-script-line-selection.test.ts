import test from "node:test";
import assert from "node:assert/strict";
import { loadCourse } from "./helpers/ui-harness";

for (const newline of ["\n", "\r\n", "\r"]) {
  test(`script errors select their physical line with ${JSON.stringify(newline)} separators`, () => {
    const { root } = loadCourse(); root.selectExercise("numbers.identity");
    const badLine = "  missing_tactic -- fix this line";
    const lines = ["-- A comment with an astral symbol: 🧮", "", "intro", badLine, "rfl"];
    const source = lines.join(newline);
    root.control("proof-script").value = source; root.control("run-script-button").emit("click");
    const input = root.control("proof-script");
    assert.match(root.html, /Line 4: Unknown tactic/);
    assert.equal(input.value, source);
    assert.equal(input.selectionStart, source.indexOf(badLine));
    assert.equal(input.selectionEnd, source.indexOf(badLine) + badLine.length);
    assert.equal(source.slice(input.selectionStart, input.selectionEnd), badLine);
    assert.equal(root.focused, input);
    assert.match(root.html, /No tactics applied yet/);
  });
}

test("a final failing line without a trailing newline is selected for correction", () => {
  const { root } = loadCourse(); const source = "-- comment\nmissing";
  root.control("proof-script").value = source; root.control("run-script-button").emit("click");
  const input = root.control("proof-script");
  assert.equal(input.selectionStart, source.indexOf("missing")); assert.equal(input.selectionEnd, source.length);
  input.value = "rfl"; root.control("run-script-button").emit("click");
  assert.match(root.html, /Accepted by the real Kernel/);
});

test("the command limit selects its reported physical line before running any command", () => {
  const { root } = loadCourse(); const source = "-- comment\n" + Array(257).fill("rfl").join("\n");
  root.control("proof-script").value = source; root.control("run-script-button").emit("click");
  const input = root.control("proof-script"); assert.match(root.html, /Line 258:/);
  assert.equal(input.selectionStart, source.length - 3); assert.equal(input.selectionEnd, source.length);
  assert.match(root.html, /No tactics applied yet/);
});

test("errors without line numbers retain usable focus and the full draft", () => {
  for (const source of ["-- no tactics", " ".repeat(65_537)]) {
    const { root } = loadCourse(); root.control("proof-script").value = source;
    root.control("run-script-button").emit("click");
    const input = root.control("proof-script"); assert.equal(input.value, source);
    assert.equal(root.focused, input);
    assert.equal(input.selectionStart, 0); assert.equal(input.selectionEnd, 0);
    assert.match(root.html, /No tactics applied yet/);
  }
});
