import test from "node:test";
import assert from "node:assert/strict";
import { loadCourse } from "./helpers/ui-harness";

const selected = (root: ReturnType<typeof loadCourse>["root"]): string | undefined => root.querySelectorAll("[data-exercise]").find((control) => control.attributes.class.split(" ").includes("active"))?.dataset.exercise;

test("a direct exercise link opens the requested executable theorem", () => {
  const { root, location } = loadCourse("#exercise=numbers.identity");
  assert.equal(selected(root), "numbers.identity");
  root.control("tactic-input").value = "intro"; root.control("apply-button").emit("click");
  assert.match(root.html, /<code>intro<\/code>/);
  assert.equal(location.hash, "#exercise=numbers.identity");
});

test("the initial route becomes a public exercise link", () => {
  const { root, location } = loadCourse();
  assert.equal(location.hash, `#exercise=${selected(root)}`);
  assert.equal(location.hash.includes("rfl"), false);
});

test("selecting an exercise updates the URL without putting a draft in it", () => {
  const { root, location, navigate } = loadCourse();
  root.control("tactic-input").value = "private unfinished draft";
  root.selectExercise("numbers.identity");
  // The DOM adapter's location is a plain object; real browsers prefix '#'.
  assert.equal(location.hash.replace(/^#/, ""), "exercise=numbers.identity");
  navigate("#exercise=numbers.identity");
  assert.equal(location.hash, "#exercise=numbers.identity");
  assert.ok(!location.hash.includes("private"));
});

test("back and forward hash navigation selects the corresponding exercise", () => {
  const { root, navigate } = loadCourse("#exercise=numbers.zero_eq_zero");
  navigate("#exercise=numbers.identity"); assert.equal(selected(root), "numbers.identity");
  navigate("#exercise=numbers.zero_eq_zero"); assert.equal(selected(root), "numbers.zero_eq_zero");
  navigate("#exercise=numbers.identity"); assert.equal(selected(root), "numbers.identity");
});

test("a hash event for the active exercise preserves its in-progress proof", () => {
  const { root, navigate } = loadCourse("#exercise=numbers.identity");
  root.control("tactic-input").value = "intro"; root.control("apply-button").emit("click");
  navigate("#exercise=numbers.identity");
  assert.match(root.html, /<code>intro<\/code>/);
  root.control("tactic-input").value = "rfl"; root.control("apply-button").emit("click");
  assert.match(root.html, /Accepted by the real Kernel/);
});

test("returning from the lab retains the current proof and restores its URL", () => {
  const { root, navigate, location } = loadCourse("#exercise=numbers.identity");
  root.control("tactic-input").value = "intro"; root.control("apply-button").emit("click");
  navigate("#kv-cache"); assert.match(root.html, /KV lab/);
  navigate("");
  assert.equal(selected(root), "numbers.identity");
  assert.match(root.html, /<code>intro<\/code>/);
  assert.equal(location.hash, "#exercise=numbers.identity");
});

test("unknown and malformed identifiers safely canonicalize to the current exercise", () => {
  const { root, navigate, location } = loadCourse("#exercise=numbers.identity");
  for (const hash of ["#exercise=missing", "#exercise=%E0%A4%A", "#exercise=%3Cimg%3E", "#exercise=numbers.identity&draft=secret"]) {
    navigate(hash);
    assert.equal(selected(root), "numbers.identity");
    assert.equal(location.hash, "#exercise=numbers.identity");
    assert.ok(!root.html.includes("<img"));
  }
});


test("the hash event after selecting an exercise does not replace its focused draft", () => {
  const { root, navigate } = loadCourse(); root.selectExercise("numbers.identity");
  const input = root.control("tactic-input"); input.value = "unfinished draft"; input.focus();
  navigate("#exercise=numbers.identity");
  assert.equal(root.control("tactic-input"), input);
  assert.equal(root.focused, input);
  assert.equal(input.value, "unfinished draft");
});
