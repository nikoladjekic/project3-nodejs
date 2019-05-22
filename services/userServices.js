const User = require('../models/User');
const logger = require('../util/logger');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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

/******* GET ALL USERS ********/
const getAllUsers = (req, res, next) => {
    console.log(req.username);
    User.find().then(function (users) {
        logger.info('Show all users requested ');
        res.send(users);
    }).catch(function (err) {
        logger.error('Show all users failed');
        res.status(404).send("Cannot find users");
    })
};


/******* FIND USER BY ID ********/
const getUserByID = (req, res, next) => {
    let user_id = req.params.id;
    logger.info('Show user by ID : ' + user_id);
    User.find({ _id: user_id })
        .then(user => {
            if (user.length > 0) {
                res.status(200).send(user);
            } else {
                res.status(404).send(`Can not find user with ID - ${user_id}.`)
            }
        })
        .catch((err) => {
            res.status(400).send(`Invalid ID supplied.`)
        })
};

/******* DELETE USER BY USERNAME ********/
const deleteUser = (req, res, next) => {
    let user_id = req.params.id;
    logger.info('Delete user by ID : ' + user_id);
    User.deleteOne({ _id: user_id })
        .then(user => {
            console.log(user);
            if (user.deletedCount > 0) {
                res.status(200).send({ "subscribed": req.subscribed });
            } else {
                res.status(404).send(`Can not find user with ID ${user_id}.`);
            }
        })
        .catch((err) => {
            res.status(400).send('Invalid ID supplied.');
        })
};

/******* UPDATE USER  ********/
const updateUser = (req, res) => {
    logger.info('Update user by ID : ' + req.body._id);
    User.updateOne({ _id: req.body._id }, req.body)
        .then(function (user) {
            if (user.nModified < 1) {
                res.status(404).send({ "subscribed": req.subscribed });
            } else {
                res.send({ "subscribed": req.subscribed });
            }
        }).catch(function (err) {
            logger.error("Cannot update user - " + err);
            res.status(404).send("Cannot update user");
        })
        ;

};

/******* LOGIN  ********/
const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username: username }).then(function (user) {
        let salt = user.salt;

        UserD = new User();
        if (UserD.validPassword(password, user.password, salt)) {
            logger.info("User '" + username + "' is logged in");

            jwt.sign({ user }, 'secretkey', (err, token) => {
                logger.info("Token - " + token);
                res.json({ token });
            })


        } else {
            logger.error("Password is wrong");
            res.status(404).send("Wrong password");
        }
    }).catch(function (err) {
        logger.error("Cannot find user - " + err);
        res.status(404).send("Cannot find user");
    });

};

const isAuth = (req, res, next) => {

    logger.info("POST request - verifyTokenRoute ... ");
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        console.log(authData.user.username);
        req.username = authData.user.username;
        if (err) {
            res.status(403).send("Forbidden");
        } else {
            logger.info("Token is correct");
            next();
        }

    })

};



const verifyToken = (req, res, next) => {
    logger.info("POST request - verifyToken ... ");
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    } else {
        res.status(403).send("Forbidden");
    }

};
module.exports = {
    addUser,
    getAllUsers,
    getUserByID,
    deleteUser,
    updateUser,
    login,
    isAuth,
    verifyToken
}