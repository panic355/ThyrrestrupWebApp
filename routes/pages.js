const express = require('express');
const authController = require('../controllers/auth');
const vehicleController = require('../controllers/vehicle');
const serviceController = require('../controllers/service');
const vehicleListingController = require('../controllers/vehicleListing');

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const axios = require('axios');
const router = express.Router();


// Here we get and render home page
router.get('/', (req, res) => {
    res.send('index');
});
router.get('/deleteMachine/:vehicleID', authController.isUserOwner, vehicleController.deleteMachine, (req, res, next) => {
    res.send('deleteMachine')
});
router.get('/createMachine', (req, res) => {
    res.send('createMachine');
});
router.get('/editMachine/:vehicleID', authController.isUserOwner, vehicleController.editMachineLoad, (req, res, next) => {
    res.send('editMachine')
});


router.get('/service/:vehicleID', authController.isUserOwner, serviceController.serviceLoad, (req, res, next) => {
    res.send('service')
});


// fleet is rendered
router.get('/fleet', vehicleListingController.fleet, (req, res, next) => {
    axios.get('fleet')
    .then(response => {
      res.send(response.data);
    });
});

// The router for vehicle is defined, now it can be used to get information to the page
router.get('/vehicle/:vehicleID', authController.isUserOrOwner, vehicleListingController.vehicle, (req, res, next) => {
    res.send('vehicle')
});
module.exports = router;