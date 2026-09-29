import test from "node:test";
import assert from "node:assert/strict";
import { AVAILABLE_THEOREM_LIST } from "../src/ui/proof-engine";
import { loadCourse, type TestRoot } from "./helpers/ui-harness";

function search(root: TestRoot, query: string): string[] {
  const filter = root.control("theorem-filter"); filter.value = query; filter.emit("input");
  return root.querySelectorAll("[data-theorem]").filter((button) => !button.hidden).map((button) => button.dataset.theorem);
}

test("the palette searches callable theorem names without changing their order", () => {
  const { root } = loadCourse();
  assert.deepEqual(search(root, "  SuCc  "), ["add_succ", "succ_add"]);
  assert.equal(root.control("theorem-filter-status").textContent, "2 of 7 theorems shown.");
});

test("an empty query restores every callable theorem", () => {
  const { root } = loadCourse(); search(root, "comm");
  assert.deepEqual(search(root, "  "), AVAILABLE_THEOREM_LIST.map((item) => item.id));
  assert.ok(!root.querySelectorAll("[data-theorem]").some((item) => item.dataset.theorem === "identity"));
});

test("no matches produce explicit text without interpreting query markup", () => {
  const { root } = loadCourse();
  assert.deepEqual(search(root, "<img src=x>"), []);
  assert.equal(root.control("theorem-filter-status").textContent, "No matching theorems.");
  assert.ok(!root.html.includes("<img"));
});

test("filtering retains live input nodes, tactic drafts, and focus", () => {
  const { root } = loadCourse(); const input = root.control("tactic-input");
  const filter = root.control("theorem-filter"); input.value = "exact "; filter.focus();
  search(root, "zero"); search(root, "add");
  assert.equal(root.control("tactic-input"), input);
  assert.equal(input.value, "exact ");
  assert.equal(root.control("theorem-filter"), filter);
  assert.equal(root.focused, filter);
});

test("the selected match inserts a theorem command without applying it", () => {
  const { root } = loadCourse(); search(root, "comm");
  const button = root.querySelectorAll("[data-theorem]").find((item) => !item.hidden); assert.ok(button);
  button.emit("click");
  assert.equal(root.control("tactic-input").value, "exact add_comm");
  assert.match(root.html, /No tactics applied yet/);
});

test("the filter survives proof-state rerenders and escapes its stored value", () => {
  const { root } = loadCourse(); root.selectExercise("numbers.identity");
  search(root, '<img "'); root.control("tactic-input").value = "intro"; root.control("apply-button").emit("click");
  assert.equal(root.control("theorem-filter").value, '<img "');
  assert.ok(!root.html.includes("<img"));
  assert.equal(root.control("theorem-filter-status").textContent, "No matching theorems.");
});
