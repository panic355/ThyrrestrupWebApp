const mssql = require("mssql");

var request = new mssql.Request();

// Database connection is defined here, this will take the information from the ".env" file, if another database is wanted it should be changed in the env file
var config = ({
    server: process.env.DATABASE_HOST,
    //port: 1433,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});
mssql.connect(config, function (err) {

    if (err) console.log(err);

})

exports.service = async (req, res) => { // service is not implemented in react and will need to be changed inorder to work with react
    //var vehicleID = req.params.vehicleID
    var { brokenPart1, brokenPart2, brokenPart3, vehicleID } = req.body;
    // var vehicleID = req.params.vehicleID

    request.query("insert into Service (brokenPart1, brokenPart2, brokenPart3, vehicleID) VALUES ('" + brokenPart1 + "', '" + brokenPart2 + "', '" + brokenPart3 + "'," + vehicleID + ")", (err, serviceResult) => {
        if (err) {
            console.log("failed to query for service: " + err)
            return
        }
        res.send('fleet');
    });
}

exports.serviceLoad = async (req, res) => {
    var vehicleID = req.params.vehicleID
    console.log(vehicleID)
    res.send({ vehicleID })
}
