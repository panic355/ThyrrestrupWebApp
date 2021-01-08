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
//let passed = null;

const testinge = () => {
return new Promise ((resolve, reject) => {

    var config = ({
      server: "lul",
      database: process.env.DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    });
       mssql.connect(config, function (error){
      if (error) {
        reject (new Error("WRONG"))
      }
      else {
        resolve(1)
      }
  });
});
}
    test("Testing database", async (done) => {
      const passed = await testinge()
      expect(passed).toBe(1);
done()

  });
