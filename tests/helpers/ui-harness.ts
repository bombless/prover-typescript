import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";

const decode = (text: string): string => text.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

// This adapter exercises the actual compiled UI handlers and element identity.
// It does not emulate browser layout, pointer capture, or assistive technology.
export class TestControl {
  readonly dataset: Record<string, string> = {};
  readonly listeners = new Map<string, Array<(event: any) => void>>();
  value = "";
  hidden = false;
  checked = false;
  selectionStart = 0;
  selectionEnd = 0;
  textContent = "";
  constructor(readonly attributes: Record<string, string>, readonly owner: TestRoot) {
    for (const [key, value] of Object.entries(attributes)) if (key.startsWith("data-")) this.dataset[key.slice(5)] = value;
    this.value = attributes.value ?? "";
    this.checked = "checked" in attributes;
  }
  get id(): string { return this.attributes.id ?? ""; }
  addEventListener(type: string, listener: (event: any) => void): void { this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]); }
  emit(type: string, fields: Record<string, unknown> = {}): { prevented: boolean } {
    const result = { prevented: false };
    const event = { target: this, preventDefault() { result.prevented = true; }, ...fields };
    for (const listener of this.listeners.get(type) ?? []) listener(event);
    return result;
  }
  focus(): void { this.owner.focused = this; }
  select(): void { this.setSelectionRange(0, this.value.length); }
  setSelectionRange(start: number, end: number): void { this.selectionStart = start; this.selectionEnd = end; }
  setAttribute(name: string, value: string): void { this.attributes[name] = value; }
  getAttribute(name: string): string | null { return this.attributes[name] ?? null; }
}

export class TestRoot {
  html = "";
  controls: TestControl[] = [];
  focused?: TestControl;
  set innerHTML(html: string) {
    this.html = html;
    this.controls = [];
    for (const match of html.matchAll(/<(button|input|textarea|output|h1|pre|p|div|section|span)\b([^>]*)>/g)) {
      const attributes: Record<string, string> = { tag: match[1] };
      for (const entry of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attributes[entry[1]] = decode(entry[2] ?? "");
      const control = new TestControl(attributes, this);
      const start = match.index! + match[0].length;
      control.textContent = decode(html.slice(start, html.indexOf(`</${match[1]}>`, start))).replace(/<[^>]+>/g, "");
      if (match[1] === "textarea") control.value = control.textContent;
      this.controls.push(control);
    }
  }
  querySelector(selector: string): TestControl | undefined { return this.querySelectorAll(selector)[0]; }
  querySelectorAll(selector: string): TestControl[] {
    return this.controls.filter((control) => selector.split(",").some((part) => {
      let selected = part.trim();
      if (selected.endsWith(":focus")) { if (this.focused !== control) return false; selected = selected.slice(0, -6); }
      if (selected.startsWith("#")) return control.id === selected.slice(1);
      if (selected.startsWith(".")) return (control.attributes.class ?? "").split(" ").includes(selected.slice(1));
      if (selected.startsWith("[")) return selected.slice(1, -1) in control.attributes;
      return control.attributes.tag === selected;
    }));
  }
  control(id: string): TestControl { const control = this.querySelector(`#${id}`); assert.ok(control, `Missing control: ${id}`); return control; }
  selectExercise(id: string): void { const control = this.controls.find((item) => item.dataset.exercise === id); assert.ok(control, `Missing exercise: ${id}`); control.emit("click"); }
}

export function loadCourse(initialHash = "") {
  const root = new TestRoot();
  const filename = require.resolve("../../src/ui/app");
  const nativeRequire = createRequire(filename);
  const listeners = new Map<string, () => void>();
  const location = { hash: initialHash };
  runInNewContext(readFileSync(filename, "utf8"), {
    exports: {},
    require: (name: string) => name.endsWith(".css") ? {} : name === "./kv-cache-lab" ? { renderKVCacheLab() { root.innerHTML = '<div id="lab">KV lab</div>'; } } : nativeRequire(name),
    document: { querySelector: () => root },
    location,
    history: { replaceState(_data: unknown, _unused: string, hash: string) { location.hash = hash; } },
    window: { addEventListener(type: string, callback: () => void) { listeners.set(type, callback); } },
  });
  return { root, location, navigate(hash: string) { location.hash = hash; listeners.get("hashchange")?.(); } };
}
