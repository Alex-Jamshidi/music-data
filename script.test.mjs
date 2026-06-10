// Import Jest functions
import { describe, it, expect, beforeEach } from "@jest/globals";

// Import readFileSync from Node.js built-in file system module
// Allows import of index.HTML for tests
import { readFileSync } from "fs";

// Import JSDOM — a library that simulates a browser DOM in Node.js
import { JSDOM } from "jsdom";

// ======================================================
// ----- Setup DOM
// ======================================================

// Reads index.html file from disk as a string
const html = readFileSync("./index.html", "utf-8");

// Passes HTML string into JSDOM to create a fake browser environment
const dom = new JSDOM(html, { url: "http://localhost" });

// Make fake document and localStorage available globally (so script.js can use them)
global.document = dom.window.document;
global.window = dom.window;
global.localStorage = dom.window.localStorage;

// Import storage functions
const { getUserIDs } = await import("./data.mjs");

// ======================================================
// ----- Seed Data and Setup
// ======================================================

function resetData() {
  return;
}

// This ensures every single test runs in a completely clean environment
beforeEach(() => {
  // Reset backend (bookmark data to seed data)
  resetData();

  // Reset frontend (clear bookmarks container)

  // Selects User 1
  const userSelect = document.getElementById("user-select");
  if (userSelect) {
    userSelect.value = "1";
    userSelect.dispatchEvent(new dom.window.Event("change"));
  }
});

// ======================================================
// ----- Tests
// ======================================================
const { countUsers } = await import("./script.mjs");

describe("The website must contain a drop-down which lists four users", () => {
  it("user select drop-down has 4 users", () => {
    const userSelect = document.getElementById("user-select");
    const userCount = userSelect.options.length - 1;
    expect(userCount).toEqual(4);
  });

  it("storage contains 4 users", () => {
    expect(getUserIDs().length).toEqual(4);
  });
});
