const Subscription = require('../models/Subscription');
const logger = require('../util/logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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

// Create Subscription
const createSubscription = (req, res, next) => {
    let newSubscription = new Subscription(req.body);
    newSubscription.save().then(subscription => {
        res.status(200).send(subscription);
        logger.info('Subscription is successfully created.');
    }).catch((err) => {
        res.status(404).send('Failed to create subscription.');
        logger.error('Failed to create subscription.' + err);
    })
};

// Delete Subscription
const deleteSubscription = (req, res, next) => {
    let subscriptionId = req.params.id;
    Subscription.remove({ _id: subscriptionId })
        .then(subscription => {
            if (subscription.deletedCount > 0) {
                res.status(200).send(subscription)
                logger.info(`Subscription is successfully removed.`)
            } else {
                res.status(404).send(`Failed to find subscription with id ${subscriptionId}.`)
                logger.error(`Failed remove subscription.`)
            }
        })
        .catch((err) => {
            res.status(404).send(`Failed to find subscription with id ${subscriptionId}.`)
            logger.error(`Failed remove subscription.` + err)
        })
};

// Update Subscription
const updateSubscription = (req, res, next) => {
    Subscription.updateOne({ _id: req.body._id }, req.body)
        .then(function (subscription) {
            if (subscription.nModified < 1) {
                res.status(404).send("Subscription is not modified");
            } else {
                res.send(subscription);
            }
        }).catch(function (err) {
            logger.error("Cannot update subscription - " + err);
            res.status(404).send("Cannot update subscription");
        })
};



module.exports = {
    createSubscription,
    deleteSubscription,
    getAllSubscriptions,
    getSubscriptionByID,
    updateSubscription
}