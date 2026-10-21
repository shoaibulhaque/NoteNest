import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import notesRoutes from "../src/routes/notesRoutes.js";
import Note from "../src/models/Note.js";

const noteId = "507f1f77bcf86cd799439011";
const note = { _id: noteId, title: "A note", content: "Its contents" };
const routes = [
  { method: "GET", modelMethod: "findById" },
  { method: "PUT", modelMethod: "findByIdAndUpdate" },
  { method: "DELETE", modelMethod: "findByIdAndDelete" },
];
let server;
let baseUrl;

before(async () => {
  const app = express();
  app.use(express.json());
  app.use("/api/notes", notesRoutes);
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api/notes`;
});

after(async () => {
  if (!server) return;
  server.closeAllConnections();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

function request(method, id) {
  return fetch(`${baseUrl}/${id}`, {
    method,
    ...(method === "PUT"
      ? {
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ title: note.title, content: note.content }),
        }
      : {}),
  });
}

for (const { method, modelMethod } of routes) {
  for (const id of ["not-an-id", "abcdefghijkl", "z".repeat(24), noteId.slice(1), `${noteId}0`]) {
    test(`${method} rejects malformed ID ${id} before querying MongoDB`, async (t) => {
      // Spies call the real methods. On base, Mongoose throws its actual CastError;
      // the repaired router rejects the request before any model method is called.
      const spies = routes.map((route) => t.mock.method(Note, route.modelMethod));
      const response = await request(method, id);
      assert.equal(response.status, 400);
      assert.deepEqual(await response.json(), { message: "Invalid note ID" });
      for (const spy of spies) assert.equal(spy.mock.callCount(), 0);
    });
  }

  test(`${method} preserves valid requests`, async (t) => {
    const query = t.mock.method(Note, modelMethod, async () => note);
    const response = await request(method, noteId);
    assert.equal(response.status, 200);
    assert.equal(query.mock.callCount(), 1);
    assert.equal(query.mock.calls[0].arguments[0], noteId);
    assert.deepEqual(await response.json(), method === "GET" ? note : {
      message: method === "PUT" ? "Note updated successfully" : "Note deleted successfully",
    });
  });

  test(`${method} preserves 404 for a well-formed missing note`, async (t) => {
    t.mock.method(Note, modelMethod, async () => null);
    const response = await request(method, noteId);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { message: "Note not found" });
  });

  test(`${method} preserves server errors for database failures`, async (t) => {
    t.mock.method(Note, modelMethod, async () => { throw new Error("fixture database failure"); });
    const response = await request(method, noteId);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { message: "Internal server error" });
  });
}

test("GET accepts uppercase hexadecimal IDs", async (t) => {
  const query = t.mock.method(Note, "findById", async () => note);
  const response = await request("GET", noteId.toUpperCase());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), note);
  assert.equal(query.mock.calls[0].arguments[0], noteId.toUpperCase());
});

test("POST still creates a note without an ID parameter", async (t) => {
  const save = t.mock.method(Note.prototype, "save", async () => note);
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: note.title, content: note.content }),
  });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), note);
  assert.equal(save.mock.callCount(), 1);
});
