const express = require('express');
const authController = require('../controllers/auth');
const vehicleController = require('../controllers/vehicle');
const vehicleListingController = require('../controllers/vehicleListing');
const serviceController = require('../controllers/service');

const router = express.Router();

// in this routes the posts are defined, these will take whatever the user's input and send it further to the register function in the auth controller
router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/deleteMachine', vehicleController.deleteMachine);

router.post('/service', serviceController.service);

router.post('/editMachine', vehicleController.editMachineEdit);

router.get('/status', authController.status);

router.get('/logout', authController.logout);

//router.post('/service', authController.servicePost)


/*function (req, res, next){
    var vehicleID = req.body.vehicleID;
    res.redirect("/editMachine/" + vehicleID) 
});*/
router.post('/createMachine', vehicleController.createMachine);

router.post('/fleet', function (req, res) {vehicleListingController.fleet});

router.post('/vehicle', function (req, res, next){
    var vehicleID = req.body.vehicleID;
    res.redirect("/vehicle/" + vehicleID) 
});

module.exports = router;