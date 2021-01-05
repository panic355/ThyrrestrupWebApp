const express = require("express"); // import express
const auth = require("./routes/auth"); //import file we are testing
const route = require("./routes/pages");
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app
const mssql = require("mssql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

app.use("/", route); //routes
app.use("/auth", auth);

describe("testing-server-database", () => {
  test("Testing database", () => {
    var config = {
      server: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    };
   // console.log("test Host: "+process.env.DATABASE_HOST+" DB: "+process.env.DATABASE+" User: "+process.env.DATABASE_USER+" pass: "+process.env.DATABASE_PASSWORD)
    mssql.connect(config, function (error) {
      let passed = true;
      if (error) {
       passed = false;
      } else {
       passed = true;
      }
      expect(passed).toBeTruthy();
    });
  });
});

