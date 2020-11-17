const mssql = require("mssql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

var request = new mssql.Request();

// Database connection is defined here, this will take the information from the ".env" file, if another database is wanted it should be changed in the env file
var config = ({
    server: process.env.DATABASE_HOST,
    //port: 1433,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_password,
    database: process.env.DATABASE

});
mssql.connect(config, function (err) {

    if (err) console.log(err);

})


exports.createMachine = async (req, res) => {
    console.log(req.body);
    const { type, vehicleID, powerBILink, personID } = req.body; // here the input from the user is retrieved from the body of the html

    // this query will check if a Vehicle is registered under that ID
    request.query("SELECT * FROM Vehicles WHERE powerBILink = ('" + powerBILink + "')", async (error, results) => {
        // error handling for the query
        if (error) {
            console.log(error);
        }
        // if an ID is allready used
        if (results.recordset.length > 0) {
            return res.status(200).redirect("/"); //res.redirect('createMachine', {
                message: 'That PowerBI is already in use' // message is sent to html where it will handle it and show it
            

        }
    });


    // here we query email, name, hashedpassword and insert it into the database
    request.query("INSERT INTO Vehicles (type, vehicleID, powerBILink, personID) VALUES ('" + type + "',+'" + vehicleID + "',+'" + powerBILink + "',+'" + personID + "')", (error, results) => {
        if (error) {
            // logging if an error occurs
            console.log(error);
        } else {

            return res.status(200).json,({
                success:true,
                redirectUrl: '/'
            
                // This messege will be sent to the html called register and then the html will show it to the user
              //  message: 'Vehicle Registered' // message is sent to html where it will handle it and show it
            });
        }
    });
}

exports.deleteMachine = async (req, res) => {
    var vehicleID = req.params.vehicleID
    //const { vehicleID } = req.body; // here the input from the user is retrieved from the body of the html

    // this query will check if a Vehicle is registered under that ID
    request.query("SELECT * FROM Vehicles where vehicleID =" + vehicleID, async (error, results) => {
        // error handling for the query
        console.log(results.recordset)
        if (error) {
            console.log(error);
            return res.send('deleteMachine', {
                message: 'Hov der skete en fejl under sletning' // message is sent to html where it will handle it and show it
            });
        }
        // if an ID is allready used
        if (results.recordset.length <= 0) {
            return res.send('deleteMachine', {
                message: 'Maskinen findes ikke i databasen' // message is sent to html where it will handle it and show it
            });
        }
    })

    // here we query email, name, hashedpassword and insert it into the database
    request.query("delete from Vehicles where vehicleID =" + vehicleID, (error, results) => {
        if (error) {
            // logging if an error occurs
            console.log(error);
        } else {
            return res.send('deleteMachine', {
                // This messege will be sent to the html called register and then the html will show it to the user
                message: 'Maskine slettet' // message is sent to html where it will handle it and show it
            });
        }
    });
}


exports.editMachineLoad = async (req, res) => {
    var vehicleID = req.params.vehicleID
    //const { type, powerBILink, personID } = req.body; // here the input from the user is retrieved from the body of the html
    // this query will check if a Vehicle is registered under that ID
    request.query("SELECT * FROM Vehicles WHERE vehicleID =" + vehicleID, async (error, results) => {
        // error handling for the query
        if (error) {
            console.log(error);
        }
        // if an ID is allready used
        if (results.recordset.length <= 0) {
            return res.send('editMachine', {
                message: 'Dette ID findes ikke i databasen' // message is sent to html where it will handle it and show it
            })
        }
        else {
            var vehicleList = [];
            for (var i = 0; i < results.recordset.length; i++) {
                var vehicle = {
                    'vehicleID': results.recordset[i].vehicleID,
                    'type': results.recordset[i].type,
                    'powerBILink': results.recordset[i].powerBILink,
                    'personID': results.recordset[i].personID
                }
                vehicleList.push(vehicle); // everytime the loop goes through one vehicle it wil be pushed to the list
            }
            res.send('editMachine', { "vehicleList": vehicleList })
        }
    });

}
exports.editMachineEdit = async (req, res) => {
    //var vehicleID = req.params.vehicleID
    const { type, vehicleID, powerBILink, personID } = req.body; // here the input from the user is retrieved from the body of the html
    // this query will check if a Vehicle is registered under that ID
    request.query("SELECT * FROM Vehicles WHERE vehicleID =" + vehicleID, async (error, results) => {
        // error handling for the query
        if (error) {
            console.log(error);
        }
        // if an ID is allready used
        if (results.recordset.length <= 0) {
            return res.send('editMachine', {
                message: 'Dette ID findes ikke i databasen' // message is sent to html where it will handle it and show it
            })
        }
    });
    // here we query email, name, hashedpassword and insert it into the database
    request.query("UPDATE Vehicles SET type ='(" + type + "', powerBILink = '" + powerBILink + "', personID = '" + personID + '"vehicleID ="' + vehicleID + "')", (error, results) => {
        if (error) {
            // logging if an error occurs
            console.log(error);
        } else {
            return res.send('./editMachine', {
                // This messege will be sent to the html called register and then the html will show it to the user
                message: 'Maskinen blev redigeret' // message is sent to html where it will handle it and show it
            });
        }
    });

}