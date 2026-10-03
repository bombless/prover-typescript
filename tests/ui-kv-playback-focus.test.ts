import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { TestRoot, TestControl } from "./helpers/ui-harness";

function loadLab() {
  const root = new TestRoot(); const timers = new Map<number, () => void>(); let timerId = 0;
  const module: { renderKVCacheLab?: (root: unknown) => () => void } = {};
  runInNewContext(readFileSync(require.resolve("../src/ui/kv-cache-lab"), "utf8"), {
    exports: module, require: () => ({}),
    window: { setInterval(callback: () => void) { timers.set(++timerId, callback); return timerId; }, clearInterval(id: number) { timers.delete(id); } },
  });
  assert.ok(module.renderKVCacheLab); const dispose = module.renderKVCacheLab(root);
  return { root, timers, dispose, tick() { for (const callback of [...timers.values()]) callback(); } };
}

test("keyboard focus stays on Play through activation and automatic playback renders", () => {
  const { root, tick } = loadLab(); root.control("kv-play").focus(); root.control("kv-play").emit("click");
  assert.equal(root.focused, root.control("kv-play")); tick();
  assert.equal(root.focused, root.control("kv-play"));
});

test("a focused Pause survives ticks, pausing, and resuming", () => {
  const { root, tick } = loadLab(); root.control("kv-play").emit("click"); root.control("kv-pause").focus();
  tick(); assert.equal(root.focused, root.control("kv-pause"));
  root.control("kv-pause").emit("click"); const paused = root.control("kv-pause"); tick();
  assert.equal(root.control("kv-pause"), paused); assert.equal(root.focused, paused);
  paused.emit("click"); tick(); assert.equal(root.focused, root.control("kv-pause"));
});

test("completion transfers focus from the newly disabled Pause to Play", () => {
  const { root, tick, timers } = loadLab(); root.control("kv-play").emit("click"); root.control("kv-pause").focus();
  for (let index = 0; index < 5; index += 1) tick();
  assert.equal(timers.size, 0); assert.equal(root.control("kv-pause").getAttribute("disabled"), "");
  assert.equal(root.focused, root.control("kv-play")); assert.match(root.html, /Derivation complete/);
});

test("manual step proof retains focus on that step as the next step is revealed", () => {
  const { root } = loadLab(); const step = root.querySelectorAll("[data-prove]")[0]; step.focus(); step.emit("click");
  assert.equal(root.focused, root.querySelectorAll("[data-prove]")[0]);
  assert.equal(root.focused?.dataset.prove, "0"); assert.equal(root.querySelectorAll("[data-prove]").length, 2);
  root.control("kv-reset").focus(); root.control("kv-reset").emit("click");
  assert.equal(root.focused, root.control("kv-reset"));
});

test("automatic playback never steals focus from outside the lab", () => {
  const { root, tick, dispose, timers } = loadLab(); root.control("kv-play").emit("click");
  const outside = new TestControl({ id: "outside", tag: "button" }, root); outside.focus();
  tick(); assert.equal(root.focused, outside);
  dispose(); assert.equal(timers.size, 0); assert.equal(root.focused, outside);
});

test("playback preserves the return link and existing form-control focus", () => {
  const { root, tick } = loadLab(); root.control("kv-play").emit("click");
  for (const id of ["kv-back", "kv-length", "kv-layers", "kv-deps"]) {
    root.control(id).focus(); tick(); assert.equal(root.focused, root.control(id));
  }
});
