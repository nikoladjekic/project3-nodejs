const Subscription = require('../models/Subscription');
const logger = require('../util/logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******* GET ALL Subscriptions ********/
const getAllSubscriptions = (req, res, next) => {
    Subscription.find().then(function (subscriptions) {
        logger.info('Show all Subscriptions requested ');
        res.send(subscriptions);
    }).catch(function (err) {
        logger.error('Show all Subscriptions failed' + err);
        res.status(404).send("Cannot find Subscriptions");
    })
};

/******* FIND USER BY ID ********/
const getSubscriptionByID = (req, res, next) => {
    let subscription_id = req.params.id;
    logger.info('Show user by ID : ' + subscription_id);
    Subscription.find({ _id: subscription_id })
        .then(subscription => {
            if (subscription.length > 0) {
                res.status(200).send(subscription);
            } else {
                res.status(404).send(`Can not find user with ID - ${subscription_id}.`)
            }
        })
        .catch((err) => {
            res.status(400).send(`Invalid ID supplied.`)
        })
};

module.exports = {
    getAllSubscriptions,
    getSubscriptionByID
}