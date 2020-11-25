const mssql = require("mssql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

const nodemailer = require('nodemailer'); // this is a library for sendding emails


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


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.mailtrap.io',
    //port: 5000,
    auth: {
      user: 'projektminkthyrrestrup@gmail.com',
      pass: 'axmnzjlphpercaqs'
    }
  });


exports.login = async (req, res) => {
    try {


        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('login')
        }

        // This query is for login and will check if the email exists in a user
        request.query("Select * FROM Persons WHERE email =('"+email+"')", async (error, results) => {

            // here we have error handling for the query
            if (!results.recordset[0] || !(await bcrypt.compare(password, (results.recordset[0].password)))) {
                res.sendStatus(401)

                // if there's no error and both password and email is correct it will go in this else statement
            } else {
                var id = results.recordset[0].personID;
                var email = results.recordset[0].email;
                var hashedPassword = results.recordset[0].password;
                var admin = results.recordset[0].admin;
                console.log('test' + results.recordset[0].personID)


                console.log(results.recordset[0].password)
                const token = jwt.sign({ id: id, email: email, hashedPassword: password, admin: admin}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                 console.log("The token is:" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.register = async (req, res) => {
    var request = new mssql.Request();
    console.log(req.body);

    const { name, email, password, passwordConfirm, admin } = req.body; // here the input from the user is retrieved from the body of the html

    // this query will check if a user is registered under that email
    request.query("SELECT email FROM Persons WHERE email = ('" + email + "')", async (error, results) => {
        // error handling for the query
        if (error) {
            console.log(error);
        }
        // if an email is allready used
        if (results.length > 0) {
            return res.send('register', {
                message: 'That email is already in use' // message is sent to html where it will handle it and show it
            })
            // here the password and confirmPassword is checked if they match
        } else if (password !== passwordConfirm) {
            return res.send('register', {
                message: 'Passwords do not match' // message is sent to html where it will handle it and show it
            });
        }

        // The password is hashed 8 times
        let hashedPassword = await bcrypt.hash(password, 8);
        // the hashed password is logged to check if it works, this loggin can be delete if wanted
        console.log(hashedPassword)

        // here we query email, name, hashedpassword and insert it into the database
        request.query("INSERT INTO Persons (email, surName, password, admin) VALUES ('" + email + "',+'" + name + "',+'" + hashedPassword + "','" + admin + "')", (error, results) => {
            if (error) {
                // logging if an error occurs
                console.log(error);
            } else {
                
                var mailOptions = {
                    from: 'projektminkthyrrestrup@gmail.com',
                    to: email,
                    subject: 'Vehicle purchase at ThyrrestrupProjektMink',
                    text: 'That was easy!'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });


                return res.redirect('/')  /*, {
                    // This messege will be sent to the html called register and then the html will show it to the user
                    message: 'User registered' // message is sent to html where it will handle it and show it
                });*/
            }
        })
    });
}

exports.service = async (req, res) => {
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

/*
exports.authenticate = async (req, res, next) => {
    const token = req.cookies.jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded. admin)
    var role = 'null';
    //console.log(token)

    if (!token) {
        return res.status(401).end()
    }

    var authorized = false;
   //if (decoded.admin = Owner)
        authorized = decoded.admin === role;
       
       if (authorized) {
           return next();
       }
       if (role == 'Owner') {
       return next();
    }
       return res.status(401).json({
           success: false,
           message: 'Unauthorized',
       })
    }*/

    exports.isUserOwner = async (req, res, next) => {
        console.log(req.header)
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.admin == 'Owner') {
        next();
        } else {
            return next(err);
        }
    };

    exports.isUserUser = async (req, res, next) => {
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.admin == 'User') {
        next();
        } else {
            return next(err);
        }
    };

    exports.isUserOrOwner = async (req, res, next) => {
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.admin == 'User' || decoded.admin == 'Owner') {
        next();
        } else {
            return next(err);
        }
    };

