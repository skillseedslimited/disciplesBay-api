const mongoose = require("mongoose");
const testdb = require("../config/testdb.config");
const supertest = require("supertest");
const app = require("../server");

require("dotenv").config();
beforeAll(async () => await testdb.connect());

afterAll(async () => await testdb.closeDatabase());

var token = null;
var baseUrl = "/api/v1/";
beforeEach(function(done) {
  var user = supertest(app);
  user
    .post("/api/v1/auth/login")
    .send({
      id: process.env.SUPER_USERNAME,
      password: process.env.SUPER_ADMIN_PASSWORD,
    })
    .end(function(err, res) {
      token = res.body.data.token || null;
      done();
    });
});

describe("Admin can create new role", () => {
  test("create role", async () => {
    var response = await supertest(app)
      .post(baseUrl + "role")
      .set("x-access-token", token)
      .send({
        name: "Admins",
        menu_structure: [
          {
            dashboard: true,
          },
        ],
        permissions: ["can-mgt-role", "can-mgt-sermons"],
      });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Admins");
  });
});
