const mongoose = require("mongoose");
const app = require("../server");
const supertest = require("supertest");
const testdb = require("../config/testdb.config");

beforeAll(async () => await testdb.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await testdb.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await testdb.closeDatabase());

describe("Admin login", () => {
  var user = supertest(app).agent();

  test("admin can login", async function() {
    const response = await user.post("/test");
  });
});
