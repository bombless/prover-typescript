import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { TestRoot } from "./helpers/ui-harness";

function loadLab() {
  const root = new TestRoot();
  const timers = new Map<number, () => void>();
  let timerId = 0;
  const module: { renderKVCacheLab?: (root: unknown) => void } = {};
  runInNewContext(readFileSync(require.resolve("../src/ui/kv-cache-lab"), "utf8"), {
    exports: module, require: () => ({}),
    window: { setInterval(callback: () => void) { timers.set(++timerId, callback); return timerId; }, clearInterval(id: number) { timers.delete(id); } },
  });
  assert.ok(module.renderKVCacheLab); module.renderKVCacheLab(root);
  return { root, timers };
}

test("continuous prefix input retains both range nodes and previews the value", () => {
  const { root } = loadLab(); const prefix = root.control("kv-length"); const layers = root.control("kv-layers");
  prefix.focus();
  for (const value of ["5", "6", "8"]) {
    prefix.value = value; prefix.emit("input");
    assert.equal(root.control("kv-length"), prefix);
    assert.equal(root.control("kv-layers"), layers);
    assert.equal(root.control("kv-length-value").textContent, value);
    assert.equal(root.focused, prefix);
  }
  prefix.emit("change");
  assert.notEqual(root.control("kv-length"), prefix);
  assert.equal(root.control("kv-length").value, "8");
  assert.equal(root.focused, root.control("kv-length"));
  assert.match(root.html, /K\[0\.\.7\]/);
});

test("continuous layer input retains its node and commits updated cache dimensions", () => {
  const { root } = loadLab(); const layers = root.control("kv-layers"); layers.focus();
  for (const value of ["3", "5", "7"]) {
    layers.value = value; layers.emit("input");
    assert.equal(root.control("kv-layers"), layers);
    assert.equal(root.control("kv-layers-value").textContent, value);
  }
  layers.emit("change");
  assert.equal(root.control("kv-layers").value, "7");
  assert.equal(root.focused, root.control("kv-layers"));
  assert.match(root.html, /Stored K\/V entries<\/span><strong>56<\/strong>/);
});

test("committing a changed prefix clears previous derivation progress", () => {
  const { root } = loadLab(); root.querySelectorAll("[data-prove]")[0].emit("click");
  assert.match(root.html, /1\/5 steps proved/);
  const input = root.control("kv-length"); input.value = "9"; input.emit("input"); input.emit("change");
  assert.match(root.html, /0\/5 steps proved/);
  assert.ok(!root.html.includes("kv-step done"));
});

test("a slider input cancels playback before its timer can replace the dragged node", () => {
  const { root, timers } = loadLab(); root.control("kv-play").emit("click");
  assert.equal(timers.size, 1);
  const input = root.control("kv-length"); input.value = "6"; input.emit("input");
  assert.equal(timers.size, 0);
  assert.equal(root.control("kv-length"), input);
  input.emit("change"); assert.match(root.html, /▶ Play derivation/);
});

test("layer changes also stop playback without resetting completed proof steps", () => {
  const { root, timers } = loadLab(); root.control("kv-play").emit("click");
  [...timers.values()][0](); assert.match(root.html, /1\/5 steps proved/);
  const input = root.control("kv-layers"); input.value = "8"; input.emit("input");
  assert.equal(timers.size, 0); assert.equal(root.control("kv-layers"), input);
  input.emit("change"); assert.match(root.html, /1\/5 steps proved/);
});

test("blur commits an interrupted input sequence only once", () => {
  const { root } = loadLab(); const input = root.control("kv-length");
  input.value = "10"; input.emit("input"); input.emit("blur");
  const committed = root.control("kv-length"); assert.equal(committed.value, "10");
  input.emit("change"); assert.equal(root.control("kv-length"), committed);
  committed.emit("change"); assert.equal(root.control("kv-length"), committed);
});
