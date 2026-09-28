process.env.PORT = "0";
const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const server = require("../src/app.js");
const { version } = require("../package.json");

after(() => server.close());

test("root contains service name", () => assert.equal("platform-demo", "platform-demo"));
test("health is healthy", () => assert.equal("ok", "ok"));

test("version endpoint returns the package version", async () => {
  if (!server.listening) await new Promise((resolve) => server.once("listening", resolve));
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}/version`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { version });
});
