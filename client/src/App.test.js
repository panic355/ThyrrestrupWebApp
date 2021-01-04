
const express = require("express"); // import express
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app


describe("testing-client-login", () => {
  let obj = {
    email: "test@mail.com",
    password: "123456",
  };
  it("POST /auth/login - success", async () => {
    const { body } = await request(app).post("/auth/login").send(obj); //uses the request function that calls on express app instance
    console.log(JSON.stringify(body));
  });
});

describe("testing-client-routes", () => {
  it("GET /fleet - success", async () => {
    const { body } = await request(app).get("/fleet"); //uses the request function that calls on express app instance
    console.log(JSON.stringify(body));
    expect(body).not.toBeNull();
  });
}); 

 
