const Pet = require('../models/Pet');
const logger = require('../util/logger');
const mongoose = require('mongoose');

// Create pet
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

//Delete pet by Id
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

// Update pet
const updatePet = (req, res, next) => {
    Pet.updateOne({ _id: req.body._id }, req.body)
    .then(function (pet) {
        if (pet.nModified < 1) {
            res.status(404).send("Pet is not modified")
            logger.error("Pet is not modified")
        } else {
            logger.info("Pet is successfully updated.")
            res.send(pet)
        }
    }).catch(function (err) {
        logger.error("Cannot update pet - " + err)
        res.status(404).send("Cannot update pet.")
    })
};

// Get all pets
const getAllPets = (req, res, next) => {
    Pet.find() 
    .then(pet => {
       res.status(200).send(pet);
       logger.info('All pets have been successfully taken.');
    })
    .catch(err => {
       res.status(404).send('404');
       logger.error('Failed to get pets.');
    });
};

// Get pet by Id
const getPetById = (req, res, next) => {
    Pet.findOne({_id: req.params.id})
    .then(pet => {
      logger.info('Pet has been successfully taken.')
      res.status(200).send(pet)
    })
    .catch(err => {
     res.status(404).send('Failed to get pet from databese.')
     logger.error('Failed to get pet from databese.')
    })
};

module.exports = {
    createPet,
    deletePetById,
    updatePet,
    getAllPets,
    getPetById
}