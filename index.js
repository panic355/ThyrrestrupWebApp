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


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

var jsonString = {
  'vehicleID': '3421',
  'type': 'StorMaskine',
  'powerBILink': 'Power.comme',
  'personID': '1',
  'timeSinceMotService': '211'
}

//app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('/fleet', (req, res) => {
  var userRights = 'User';

    var statement = ("");
    var anArray = [];

    var vehicleList = []; // the list for vehicles is initiated
    if (userRights == 'User') { 
        statement = ("select * from Vehicles where vehicleID is not null")
    }

/*
    if (userRights == 'Owner') {
        statement = ("select * from Vehicles")
    }
*/

    request.query(statement, (err, vehiclesResult) => {
        if (err) {
            console.log("failed to query for vehicles: " + err)
            res.sendStatus(500)
            return
        }

        if (!vehiclesResult.recordset) {
            console.log("No vehicles on this customer: ")
            res.sendStatus(500)
            return
        }
        
        for (var i = 0; i < vehiclesResult.recordset.length; i++) {
            var vehicleIDs = {
                'vehicleID': vehiclesResult.recordset[i].vehicleID,
            }
            anArray.push(vehiclesResult.recordset[i].vehicleID); //
        }
        
       // var anID = vehiclesResult.recordset.vehicleID
        // query all vehicles
       t = anArray.toString()
       console.log(t)
       
        request.query("SELECT vehicleID, max(timeSinceMotService) timeSinceMotService FROM VehicleDatas where timeSinceMotService is not null group by vehicleID order by vehicleID", (err, result) => {
            if (err) {
                console.log("failed to query for vehicles: " + err)
                res.sendStatus(500)
                return
            }
            if (!result.recordset[0]) {
                console.log("No vehicles on this customers: ")
                res.sendStatus(500)
                return
            }
            else {

            // The list is populated using result.recordset and then looping through all the results
            for (var i = 0; i < vehiclesResult.recordset.length; i++) {
                var vehicle = {
                    'vehicleID': vehiclesResult.recordset[i].vehicleID,
                    'type': vehiclesResult.recordset[i].type,
                    'powerBILink': vehiclesResult.recordset[i].powerBILink,
                    'personID': vehiclesResult.recordset[i].personID,
                    'timeSinceMotService': result.recordset[i].timeSinceMotService
                }
                vehicleList.push(vehicle); // everytime the loop goes thorugh one vehicle it wil be pushed to the list
            }
            //{ "vehicleDataList": vehicleDataList, "alarms": alarms }
            console.log('sending data');
            res.json(vehicleList)
        }
        });
    });
  });


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port);

console.log(`Password generator listening on ${port}`);