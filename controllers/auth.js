const mssql = require("mssql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const nodemailer = require('nodemailer'); // this is a library for sendding emails


var request = new mssql.Request();

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



let transporter = nodemailer.createTransport({ // This is the mail that the email is beeing sent from, for security reasons this should be defined in the .env folder
    service: 'gmail',
    host: 'smtp.mailtrap.io',
    //port: 5000,
    auth: {
      user: 'projektminkthyrrestrup@gmail.com',
      pass: 'axmnzjlphpercaqs'
    }
  });


exports.login = async (req, res) => {
        const { email, password } = req.body;
        console.log("This is the body: "+email, password )
         if (!email || !password) {
            const msg = 'Email eller angangskode er forkert'
            res.json({ // here the json to send to front end is defined and sent with status and the error
                status: 401,
                error: msg
            });
        }

        // This query is for login and will check if the email exists in a user
        request.query("Select * FROM Persons WHERE email =('"+email+"')", async (error, results) => {

            // here we have error handling for the query
            if (!results.recordset[0] || !(await bcrypt.compare(password, (results.recordset[0].password)))) { // this will check if there if the user typed the password correct
                if (error) {
                    console.log(error)
                }
                msg = 'Email eller angangskode er forkert'
                    res.json({ // here the json to send to front end is defined and sent with status and the error
                        status: 401,
                        error: msg
            });
                // if there's no error and both password and email is correct it will go in this else statement
            }
            else {
                var id = results.recordset[0].personID;
                var email = results.recordset[0].email;
                var hashedPassword = results.recordset[0].password;
                var admin = results.recordset[0].admin;


                console.log(results.recordset[0].password)
                const token = jwt.sign({ id: id, email: email, hashedPassword: password, admin: admin}, process.env.JWT_SECRET, { // the cookie is signed values expressed in the {}, the password should not be here for security reasons
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                 console.log("The token is:" + token); // this will just log the token, this is only used for testing purposes

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions); // the cookie is set with the name jwt
                res.json({ // if login is succesful send status 200, this is what react is using to know if login went well
                    status: 200
                });
            }
        });  
}


exports.register = async (req, res) => {
    var request = new mssql.Request();
    console.log(req.body);

    const { name, email, confirmEmail, password, passwordConfirm, admin } = req.body; // here the input from the user is retrieved from the body of the html

    // this query will check if a user is registered under that email
    request.query("SELECT email FROM Persons WHERE email = ('" + email + "')", async (error, results) => {
        // error handling for the query
        if (error) {
            console.log(error);
        }
        // if an email is allready used
        if (results.length > 0) {
            return res.send('register', { // these error messeges might need to be converted to json
                message: 'That email is already in use' // message is sent to html where it will handle it and show it
            })
        } 

        if (email !== confirmEmail) {
            return res.send('register', {// these error messeges might need to be converted to json
                message: 'Email allready exists' // message is sent to html where it will handle it and show it
            });

            // here the password and confirmPassword is checked if they match
        } if (password !== passwordConfirm) {
            return res.send('register', {// these error messeges might need to be converted to json
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
                
                var mailOptions = { // this is where we define where the mail is sent from and where to send to
                    from: 'projektminkthyrrestrup@gmail.com',
                    to: email,
                    subject: 'Vehicle purchase at ThyrrestrupProjektMink',
                    text: "Du er nu blevet oprettet i systemet som bruger, dine oplysninger er: Email"+email+"     Password: "+password+'That was easy!' // this will send a messege to the user with the credentials that the admin made the user with
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response); // loggin the response if the mail was sent
                    }
                  });


                return res.redirect('/')  // this will redirect the page to home page after a user is registered
            }
        })
    });
}


exports.serviceLoad = async (req, res) => {
    var vehicleID = req.params.vehicleID
    console.log(vehicleID)
    res.send({ vehicleID })
}

exports.status = async (req, res) => {
    let response = false;

    if(req.cookies.jwt) {
      response = true;
  }
  res.json({ active: response });
}

exports.logout = async (req, res) => { // this will clear the cookie which then will log you out since the program doesn't know who you are
    res.clearCookie('jwt');
    res.json({ active: false });
}

    exports.userType = async (req, res) => { // this is used to check what type the user is, admin or user etc, then send a response back accordingly
        
        const token = req.cookies.jwt
        var msg = '';

        if (!(req.cookies.jwt)) { // if there is no cookie set in the browser then the user is not logged in and the code should stop here
            msg = "Ikke logget ind"
            res.json({
                userType: msg
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

         if (decoded.admin == 'User') { // this will check in the cookie what user type the user is and check if it is of type 'User'
            msg = 'Bruger'
            console.log("Brugeren typen er : "+msg)
            res.json({
                userType: msg
            });
        }
        else if (decoded.admin == 'Owner') { // this will check in the cookie what user type the user is and check if it is of type 'Owner'
            msg = 'Administrator'
            console.log("Brugeren typen er : "+msg)
            res.json({
                userType: msg
            });
        }
        else {
           msg ='Hov, noget gik galt ' // if none of the above if statements go through then an error has occured and will be logged
           console.log("error user not: "+msg)
           return;  // return
        }
        return; // return
    };

