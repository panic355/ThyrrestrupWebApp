const mssql = require("mssql");
var request = new mssql.Request();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const jwt = require('jsonwebtoken')




// Database connection is defined here, this will take the information from the ".env" file, if another database is wanted it should be changed in the env file
var config = ({
    server: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,

});


mssql.connect(config, function (err) {

    if (err) console.log(err);

});


exports.fleet = async (req, res) => {
    var request = new mssql.Request();

    console.log("GETTING FLEET");
    const token = req.cookies.jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    var personID = decoded.id
    var userRights = decoded.admin

    var statement = ("");
    var anArray = [];

    var vehicleList = []; // the list for vehicles is initiated
    if (userRights == 'User') {  // this sql script will only get the vehicles that the person owns
        statement = ("select * from Vehicles where personID ="+personID)
    }

    if (userRights == 'Owner') { // this will get all vehicles if the userType is Owner
        statement = ("select * from Vehicles")
    }

    request.query(statement, (err, vehiclesResult) => {
        if (err) {
            console.log("failed to query for vehicles: " + err)
            res.sendStatus(500)
            return
        }

        if (!vehiclesResult.recordset) { // check if there is a vehicle on the customer
            console.log("No vehicles on this customer: ")
            res.sendStatus(500) // if no vehicles the send response status 500 to frontend
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
       console.log('What is t'+t)
       
        request.query("SELECT vehicleID, max(timeSinceMotService) timeSinceMotService FROM VehicleDatas where vehicleID IN ("+t+") and timeSinceMotService is not null group by vehicleID order by vehicleID", (err, result) => {
            if (err) {
                console.log("failed to query for vehicles: " + err)
                res.sendStatus(500)
                return
            }
            if (!result.recordset[0]) {
                console.log("No vehicles on this customer: ")
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
            console.log('sending data'); // this will just log if the data is beeing sent
            res.json(vehicleList) // send a respoinse object in form of json to react
        }
        });
    });
}

// this next method needs to be implemented in react
// this method handles alarms and puts a text string instead of a numeric value
exports.vehicle = async (req, res) => { // this method needs a VehicleID to work
    var vehicleID = req.params.vehicleID
    console.log(vehicleID);
    var vehicleDataList = [];
    var alarms = []; // vehicleDataList is initiated

    request.query("SELECT * from Alarms where vehicleID=" + vehicleID, (err, alarmsResult) => {
        if (err) {
            console.log("failed to query for vehicles: " + err)
            return
        }

        else if (alarmsResult.recordset.length > 0) {

            alu = alarmsResult.recordset[0].alarmCode
            // Chained replacements will now change the numbers out with values such as "hydraulic Temp Too High"
            var replaceStringVals = alu. 
                replace('0', 'Hydraulic Temp. Warning').
                replace('1', 'Hydraulic Temp. Too High').
                replace('2', 'Hydraulic Sensor Fault').
                replace('3', 'Hydraulic Oil Level Low').
                replace('4', 'Generator ON').
                replace('5', 'Fuel Level Alarm').
                replace('6', 'Feeding Active').
                replace('7', 'Air Filter Clogged').
                replace('8', 'CAN Bus ERORR. No reading').
                replace('9', 'Preheat ON').
                replace('10', 'Motor Temp. Warning').
                replace('11', 'Motor Temp. Too High').
                replace('12', 'Motor Temp. Sensor Fault').
                replace('13', 'Motor Running').
                replace('14', 'Motor Oil Pressure Low').
                replace('15', 'Mixer Mode Active').
                replace('16', 'Warning Active On Display').
                replace('17', 'Stop! Hyd/Mot Temperature Too High').
                replace('18', 'Stop! Oil Pressure Too High').
                replace('19', 'Motor Service Warning').
                replace('20', 'Motor Service Now').
                replace('21', 'Hydraulic Oil Too Cold/Speed Too High').
                replace('22', 'Hydraulic Service Warning').
                replace('23', 'Hydraulic Service Now');


                // now the alarms are put into an array so it can be send the page
            for (var i = 0; i < alarmsResult.recordset.length; i++) {
                var alarm = {
                    'alarmCode': replaceStringVals,
                    'alarmTime': alarmsResult.recordset[0].alarmTime
                }
                alarms.push(alarm);
                console.log(alarm)
            }
        }

    })

    request.query("select * from [dbo].[VehicleDatas] where vehicleID =" + vehicleID, (err, result) => { // Get fields from the vehicledata table where id =? and then puts it pass it to result
        // Here is the error handling of the query, if an error or no result happens code will run the if statement
        if (err || result.recordset.length < 1) {
            console.log("failed to query for vehicles: " + err)
            res.sendStatus(500)
            return
        }
        var vehicleData = {
            'feedLevel': result.recordset[0].feedLevel,
            'fuelLevel': result.recordset[0].fuelLevel,
            'hydraulicPressure': result.recordset[0].hydraulicPressure,
            'hydraulicTemperature': result.recordset[0].hydraulicTemperature,
            'motorTemperature': result.recordset[0].motorTemperature,
            'motorSpeed': result.recordset[0].motorSpeed,
            'timeSinceHydService': result.recordset[0].timeSinceHydService,
            'timeSinceMotService': result.recordset[0].timeSinceMotService,
            'mechanicalMotorTimer': result.recordset[0].mechanicalMotorTimer,
            'motorRunTimerHour': result.recordset[0].motorRunTimerHour,
            'motorRunTimerMinutes': result.recordset[0].motorRunTimerMinutes,
            'nowTime': result.recordset[0].nowTime,
            'vehicleID': result.recordset[0].vehicleID,

            // alarms is thrown into result here
        }
        vehicleDataList.push(vehicleData); // the vehicleData is pushed to the list "vehicleDataList"

        res.send({ "vehicleDataList": vehicleDataList, "alarms": alarms }); // the vehicle page is rendered and sending the list with it
    })


}