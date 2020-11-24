const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const mssql = require("mssql");
const dotenv = require("dotenv");
const axios = require('axios');
const vehicleListingController = require('./controllers/vehicleListing');
var request = new mssql.Request();
const port = process.env.PORT || 5000;
dotenv.config({ path: "./.env" });
const auth = require('./routes/auth');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { readSync } = require('fs');


const app = express();

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


app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', require('./routes/pages'));
app.use('/auth', auth);

// Put all API endpoints under '/api'
app.get('/api/check', (req, res) => {
  let response = false;

  if(req.cookies.jwt) {
    response = true;
}
res.json({ active: response });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port);

console.log(`Server listening on ${port}`);