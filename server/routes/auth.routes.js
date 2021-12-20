const express = require('express');
const app = express.Router();
const controller = require('../controller/auth.controller');
const middleware = require('../middleware/auth.middleware');

app.post('/sendOTP', middleware.isUserRegistered, controller.sendOTP);

app.post('/studentLogin', middleware.verifyOTP, controller.login);

app.post('/officialLogin', 
    [middleware.isUserRegistered, middleware.isPasswordCorrect], 
    controller.login
);

app.get('/checkStudentLoginStatus', controller.checkStudentLoginStatus);

app.get('/checkOfficialLoginStatus', controller.checkOfficialLoginStatus);

app.get('/logout', controller.logout);

module.exports = app;