const express = require("express"); // import express
const auth = require('./routes/auth'); //import file we are testing
const route = require('./routes/pages');
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app
const mssql = require("mssql");

app.use("/", route); //routes
app.use("/auth", auth);

var config = {
    server: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };

mssql.connect(config, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("MsSQL Connected..."); // log to confirm it connected to database
    }
  });

describe("testing-server-login", () => {
    let obj = {
        email: "test@mail.com",
        password: "123456",
      };
    it("POST /auth/login - success", async () => {
      const { body } = await request(app).post("/auth/login").send(obj); //uses the request function that calls on express app instance
    console.log(JSON.stringify(body));
    });
  });

describe("testing-server-routes", () => {
  it("GET /fleet - success", async () => {
    const { body } = await request(app).get("/fleet"); //uses the request function that calls on express app instance
    console.log(JSON.stringify(body));
    expect(body).not.toBeNull();
  });
});


