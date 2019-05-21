const User = require('../models/User');
const logger = require('../util/logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



/******* CREATE USER ********/
const addUser = (req, res, next) => {
    logger.info(`POST fired: add user ${req.body.username} , ${Date(Date.now())}`);

    UserDB = new User(req.body);
    UserDB.save()
        .then(function (user) {
            logger.info("Creating user ... ");
            res.send(user);
            logger.info("User is created");
        }).catch(function (err) {
            logger.error("Cannot add user - " + err);
            res.status(404).send("Cannot add user");
        });
};


module.exports = {
    addUser
}