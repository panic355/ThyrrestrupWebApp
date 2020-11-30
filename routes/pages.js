const express = require('express');
const authController = require('../controllers/auth');
const vehicleController = require('../controllers/vehicle');
const serviceController = require('../controllers/service');
const vehicleListingController = require('../controllers/vehicleListing');
const sa = require('superagent');

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const axios = require('axios');
const { request } = require('express');
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
router.post('/updateMachine', (req, res) => {
    let updateUrl = 'https://functionupdatethyrrestrup.azurewebsites.net/api/UpdateFunction?code=8FgyN/s9h3iN4oBT6N26Xnz7MJHGw5nbnc3mTKHBIFQt2h3SnkLbJg==';
    var responseBack = res;
    console.log(req.body);
    sa.post(updateUrl).set('Content-Type', 'application/json').send({command: 'update'}).end(function(err, res){
        console.log('client: ' + res.clientError + ' server: ' + res.serverError);

        if (res.clientError == 1 || res.serverError == 1) {
            responseBack.status(500).json({'confirm':'Something went wrong'});
        } else {
            responseBack.json({'confirm':'Message Received'});
        }
    })
});
// fleet is rendered
router.get('/fleet', vehicleListingController.fleet, (req, res, next) => {
    console.log('found path');
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