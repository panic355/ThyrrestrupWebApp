const mssql = require("mssql");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const nodemailer = require('nodemailer'); // this is a library for sendding emails

const testinge = (email, password) => {
    return new Promise ((resolve, reject) => {
let passed = 0;
let transporter = nodemailer.createTransport({ // This is the mail that the email is beeing sent from, for security reasons this should be defined in the .env folder
    service: 'gmail',
    host: 'smtp.mailtrap.io',
    //port: 5000,
    auth: {
      user: 'projektminkthyrrestrup@gmail.com',
      pass: 'axmnzjlphpercaqs'
    }
  });

  var mailOptions = { // this is where we define where the mail is sent from and where to send to
    from: 'projektminkthyrrestrup@gmail.com',
    to: email,
    subject: 'Vehicle purchase at ThyrrestrupProjektMink',
    text: "Du er nu blevet oprettet i systemet som bruger, dine oplysninger er: Email: "+email+"     Password: "+password+'That was easy!' // this will send a messege to the user with the credentials that the admin made the user with
  };
  
  transporter.sendMail(mailOptions, function(error){
    if (error) {
    reject (new Error("WRONG"))
    } else {
     resolve(1)
    }
  });
})
}
    test("Testing send Credentials", async (done) => {
         const passed = await testinge("manchristoffer@yahoo.dk", "testPassword")
        expect(passed).toBe(1);
  done()
    })