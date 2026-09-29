import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { copyFile, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

async function startServer(t: TestContext, readFailure = false): Promise<{ port: number; directory: string }> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "prover-web-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await copyFile(path.resolve(__dirname, "../../server.cjs"), path.join(directory, "server.cjs"));
  await mkdir(path.join(directory, "dist-web"));
  await writeFile(path.join(directory, "dist-web/index.html"), "proof course");
  await writeFile(path.join(directory, "dist-web/asset.txt"), "asset bytes");
  if (readFailure) {
    await writeFile(path.join(directory, "fail-read.cjs"), `const fs = require("node:fs");
const original = fs.readFile;
fs.readFile = function(file, callback) {
  if (String(file).endsWith("asset.txt")) return process.nextTick(() => callback(new Error("simulated read failure")));
  return original.apply(this, arguments);
};`);
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const reservation = net.createServer();
    reservation.listen(0, "127.0.0.1");
    await once(reservation, "listening");
    const port = (reservation.address() as net.AddressInfo).port;
    await new Promise<void>((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()));
    const child = spawn(process.execPath, [...(readFailure ? ["--require", path.join(directory, "fail-read.cjs")] : []), path.join(directory, "server.cjs")], {
      env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stderr = "";
    child.stderr.on("data", chunk => { stderr += String(chunk); });
    const exited = once(child, "exit");
    t.after(async () => {
      if (child.exitCode === null && child.signalCode === null) child.kill();
      await exited;
    });
    const ready = await Promise.race([once(child.stdout, "data").then(() => true), exited.then(() => false)]);
    if (ready) return { port, directory };
    if (!stderr.includes("EADDRINUSE")) throw new Error(`Web server failed to start: ${stderr}`);
  }
  throw new Error("Could not reserve a port for the web server");
}

function request(port: number, requestPath: string, method = "GET", headers: http.OutgoingHttpHeaders = {}): Promise<{ status: number; body: string; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path: requestPath, method, headers }, response => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", chunk => { body += chunk; });
      response.on("end", () => resolve({ status: response.statusCode!, body, headers: response.headers }));
      response.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(3000, () => req.destroy(new Error("Web request timed out")));
    req.end();
  });
}

test("ETags allow unchanged GET responses to return 304 without a body", { timeout: 10000 }, async t => {
  const { port } = await startServer(t);
  const first = await request(port, "/asset.txt");
  assert.equal(first.status, 200);
  assert.match(first.headers.etag!, /^"[A-Za-z0-9_-]+"$/);
  assert.equal(first.headers["content-length"], String(Buffer.byteLength(first.body)));
  assert.equal(first.headers["cache-control"], "no-cache");
  const cached = await request(port, "/asset.txt", "GET", { "If-None-Match": first.headers.etag });
  assert.equal(cached.status, 304);
  assert.equal(cached.body, "");
  assert.equal(cached.headers.etag, first.headers.etag);
});

test("conditional retrieval compares weak tags, lists, wildcard and nonmatches", { timeout: 10000 }, async t => {
  const { port } = await startServer(t);
  const tag = (await request(port, "/asset.txt")).headers.etag!;
  for (const value of [`W/${tag}`, `"other", W/${tag}`, "*", `  ${tag}  `]) {
    assert.equal((await request(port, "/asset.txt", "GET", { "If-None-Match": value })).status, 304, value);
  }
  assert.equal((await request(port, "/asset.txt", "GET", { "If-None-Match": '"different"' })).status, 200);
});

test("same-size file edits invalidate the content-derived validator", { timeout: 10000 }, async t => {
  const { port, directory } = await startServer(t);
  const first = await request(port, "/asset.txt");
  await writeFile(path.join(directory, "dist-web/asset.txt"), "newer bytes");
  const changed = await request(port, "/asset.txt", "GET", { "If-None-Match": first.headers.etag });
  assert.equal(changed.status, 200);
  assert.equal(changed.body, "newer bytes");
  assert.notEqual(changed.headers.etag, first.headers.etag);
});

test("HEAD shares GET metadata and never sends a body", { timeout: 10000 }, async t => {
  const { port, directory } = await startServer(t);
  await writeFile(path.join(directory, "dist-web/asset.txt"), "proof ∀");
  const get = await request(port, "/asset.txt");
  const head = await request(port, "/asset.txt", "HEAD");
  assert.equal(head.status, 200);
  assert.equal(head.body, "");
  assert.equal(head.headers.etag, get.headers.etag);
  assert.equal(head.headers["content-length"], String(Buffer.byteLength("proof ∀")));
  assert.equal((await request(port, "/asset.txt", "HEAD", { "If-None-Match": get.headers.etag })).status, 304);
});

test("navigation fallback uses the document validator and missing builds stay 404", { timeout: 10000 }, async t => {
  const { port, directory } = await startServer(t);
  const tag = (await request(port, "/")).headers.etag!;
  assert.equal((await request(port, "/lesson/one", "GET", { "If-None-Match": tag })).status, 304);
  await rm(path.join(directory, "dist-web/index.html"));
  assert.equal((await request(port, "/", "GET", { "If-None-Match": "*" })).status, 404);
});

test("If-None-Match does not convert unsupported methods into cache hits", { timeout: 10000 }, async t => {
  const { port } = await startServer(t);
  assert.notEqual((await request(port, "/asset.txt", "POST", { "If-None-Match": "*" })).status, 304);
});

test("read failures have no validator and do not stop later requests", { timeout: 10000 }, async t => {
  const { port } = await startServer(t, true);
  const response = await request(port, "/asset.txt", "GET", { "If-None-Match": "*" });
  assert.equal(response.status, 500);
  assert.equal(response.body, "Unable to read file");
  assert.equal(response.headers.etag, undefined);
  assert.equal((await request(port, "/")).body, "proof course");
});
