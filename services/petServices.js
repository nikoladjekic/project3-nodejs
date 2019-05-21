const Pet = require('../models/Pet');
const logger = require('../util/logger');
const mongoose = require('mongoose');

const createPet = (req, res, next) => {
    let newPet = new Pet(req.body);
    newPet.save().then(pet => {
       res.status(200).send(pet);
       logger.info('Pet is successfully created.');
    }).catch((err) => {
        res.status(404).send('Failed to create pet.');
        logger.error('Failed to create pet.');
    })
};

const deletePetById = (req, res, next) => {
    let petId = req.params.id;
    Pet.remove({ _id: petId })
        .then(pet => {
            if(pet.deleteCount > 0){
                res.status(200).send(pet)
                logger.info(`Pet is successfully removed.`)
            }else{
                res.status(404).send(`Failed to find pet with id ${petId}.`)
                logger.error(`Failed remove pet.`)
            }
        })
        .catch((err) => {
            res.status(404).send(`Failed to find pet with id ${petId}.`)
            logger.error(`Failed remove pet.`)
        })
};

module.exports = {
    createPet,
    deletePetById
}