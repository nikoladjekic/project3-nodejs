const Subscription = require('../models/Subscription');
const User = require('../models/User');
const logger = require('../util/logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


/******* GET ALL Subscriptions ********/
const getAllSubscriptions = (req, res, next) => {
    Subscription.find().then(function (subscriptions) {
        logger.info('Show all subscriptions requested ')
        res.send(subscriptions)
    }).catch(function (err) {
        logger.error('Show all subscriptions failed' + err)
        res.status(404).send("Cannot find Subscriptions")
    })
};

/******* FIND USER BY ID ********/
const getSubscriptionByID = (req, res, next) => {
    let subscription_id = req.params.id;
    logger.info('Show user by ID : ' + subscription_id)
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

/******* CREATE SUBSCRIPTION ********/
const createSubscription = (req, res, next) => {
    let newSubscription = new Subscription(req.body)
    newSubscription.save().then(subscription => {

        res.status(200).send(subscription);
        logger.info('Subscription is successfully created.')
    }).catch((err) => {
        res.status(404).send('Failed to create subscription.')
        logger.error('Failed to create subscription.' + err)
    })
};

/******* DELETE SUBSCRIPTION ********/
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


/******* UPDATE SUBSCRIPTION ********/
const updateSubscription = (req, res, next) => {
    Subscription.updateOne({ _id: req.body._id }, req.body)
        .then(function (subscription) {
            if (subscription.nModified < 1) {
                res.status(404).send("Subscription is not modified")
            } else {
                res.send(subscription)
            }
        }).catch(function (err) {
            logger.error("Cannot update subscription - " + err)
            res.status(404).send("Cannot update subscription")
        })
};

/******* CHECK SUBSCRIPTION ********/
const checkSubscription = (req,res,next) => {
    let username = req.username;
    let url = req.originalUrl;
    let object = req.body;
    let keys_with_id = Object.keys(object);
    let url_collection = url.split('/');
    let collection_name = url_collection[1];
    
    let keys = keys_with_id.filter( function (key){
        return key !== "_id";
    });

    User.find({ username: username })
        .then(user => {
            if (user.length > 0) {
                let user_id = user[0]._id;
                let query = {$and:[{user_id: user_id},{'subject.collection.name': collection_name}]};
                
                Subscription.find(query)
                .then(subscription => {
                    if(subscription.length > 0){
                    
                        let idPatterns = subscription[0].subject.entities.idPattern;
                        let attrs= subscription[0].subject.condition.attrs;
                        let attrs_subscribed = false;
                        let idPatterns_subscribed = false;

                        if(idPatterns[0] === "*") {
                            idPatterns_subscribed = true;
                        }else if(idPatterns.includes(req.body._id)){
                            idPatterns_subscribed = true;
                        }else{
                            idPatterns_subscribed = false;
                            console.log('Unsupported documents' + idPatterns + ' id: ' + req.body._id);
                            logger.error('Unsupported documents');
                        }

                        if(attrs[0] === "*"){
                            attrs_subscribed = true;
                        }else if(keys.every((val) => { return attrs.includes(val) })){
                            attrs_subscribed = true;
                        }else{
                            attrs_subscribed = false;
                            console.log('Unsupported attributes ' + attrs + ' keys: ' + keys);
                            logger.error('Unsupported attributes');
                        }

                        if(idPatterns_subscribed === true && attrs_subscribed === true){
                            req.subscribed = true; 
                        }else{
                            req.subscribed = undefined;
                            console.log('User is not subscribed for this action');
                            logger.error('User is not subscribed for this action');
                        }
                        next();
                    }else{
                        console.log('Can not find subscription for user with ID: ' + user_id );
                        logger.error('Can not find  subscription for user by ID: '+ user_id);
                    }
                })
                .catch((err) => {
                   console.log('Can not find subscription for user by ID: '+ user_id + 'Error: ' + err);
                   logger.error('Can not find  subscription for user by ID: '+ user_id + 'Error: ' + err);
                })
            } else {
                console.log('Username is not valid' + err);
                logger.error('Username is not valid' + err);
            }
        })
        .catch((err) => {
            console.log('Can not find user by username '+ username + 'Error: ' + err);
            logger.error('Can not find user by username '+ username);
        })
};


module.exports = {
    createSubscription,
    deleteSubscription,
    getAllSubscriptions,
    getSubscriptionByID,
    updateSubscription,
    checkSubscription
}