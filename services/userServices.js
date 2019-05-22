const User = require('../models/user.js');
const logger = require('../util/logger');

const createUser = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            logger.info('User has been added!')
            res.status(200).send(user)
        })
        .catch(err => {
            res.status(404).send('Failed to create user');
            console.log(err)
        });

}

const getUsers = (req, res, next) => {
    User.findAll().then(
        users => {
            logger.info("All users have been fetched")
            res.status(200).send(users)
        }
    ).catch(
        err => {
            res.status(404).send("Failed to fetch users from db");
            console.log(err)

        }
    )
}

const getUserById = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } }).
        then(
            user => {
                logger.info("User has been found by id");
                res.status(200).send(user)
            }
        ).catch(
            err => {
                res.status(404).send("Failed to get user by id");
                console.log(err);
            }
        )
}

const deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id } }).
        then(
            () => {
                logger.info("User has been successfully deleted");
                res.status(200).send("User has been successfully deleted")
            }
        ).catch(
            err => {
                res.status(404).send("Failed to delete user by id");
                console.log(err);
            }
        )
}


const updateUser = (req, res, next) => {
    if (!req.body.username) {
        res.status(400).send("You have provided bad data")
    } else {
        User.update({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        },
            { where: { id: req.params.id } }).
            then(
                () => {
                    logger.info("User has been successfully updated");
                    res.status(200).send("User has been successfully updated")
                }
            ).catch(
                err => {
                    res.status(404).send("Failed to update user by id");
                    console.log(err);
                }
            )
    }
}


module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}