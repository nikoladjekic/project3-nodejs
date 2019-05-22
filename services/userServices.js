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
    User.findOne({where:{id:req.params.id}}).
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



module.exports = {
    createUser,
    getUsers,
    getUserById
}