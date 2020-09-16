const mongoose = require("mongoose");
const app = require("../server");
const supertest = require("supertest");
const testdb = require("../config/testdb.config");
const Sermon = require("../models/Sermon");
require("dotenv").config();
beforeAll(async () => await testdb.connect());
afterAll(async () => await testdb.closeDatabase());

var token = null;
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

describe("Sermon can be created", () => {
  test("test if sermon can be created", async function() {
    var response1 = await supertest(app)
      .post("/api/v1/sermon/category/create")
      .set("x-access-token", token)
      .send({
        name: "Relationship",
      });
    expect(response1.body.success).toBe(true);
    var category = response1.body.data;
    var response = await supertest(app)
      .post("/api/v1/sermon/create")
      .set("x-access-token", token)
      .send({
        title: "Test sermon",
        author: "Gbenga adeyinka",
        category: category._id || null,
        content_type: "ebook",
        description: "lorem ipsum lorem ipsum",
        status: "publish",
        subscription_type: "free",
        cover_image: "test:sbbj/dfghf",
        price: 5000,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Test sermon");
  });
});

// describe("test ", () => {
//   it("testing", () => {
//     expect(true).toBe(true);
//   });
// });

describe("Sermon can be updated", () => {
  test("test if sermon can be updated", async function() {
    var response1 = await supertest(app)
      .post("/api/v1/sermon/category/create")
      .set("x-access-token", token)
      .send({
        name: "Relationship",
      });
    var category = response1.body.data;
    var response2 = await supertest(app)
      .post("/api/v1/sermon/create")
      .set("x-access-token", token)
      .send({
        title: "Test sermon",
        author: "Gbenga adeyinka",
        category: category._id || null,
        content_type: "ebook",
        description: "lorem ipsum lorem ipsum",
        status: "publish",
        subscription_type: "free",
        cover_image: "test:sbbj/dfghf",
        price: 5000,
      });

    var sermon = response2.body.data;

    var response = await supertest(app)
      .post(`/api/v1/sermon/${sermon._id}/update`)
      .set("x-access-token", token)
      .send({
        title: "Test sermon",
        author: "Gbenga adeyinka",
        category: category._id || null,
        content_type: "ebook",
        description: "lorem ipsum lorem ipsum",
        status: "publish",
        subscription_type: "free",
        cover_image: "test:sbbj/dfghf",
        price: 5000,
      });
    var new_sermon = response.body.sermon;

    console.log(response.body);
    console.log(new_sermon);
    console.log(sermon);
    expect(new_sermon).not.toBe(sermon);
  });
});
