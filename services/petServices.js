const Pet = require('../models/pet.js');
const logger = require('../util/logger');

const createPet = (req, res, next) => {
    Pet.create(req.body)
        .then(pet => {
            logger.info('Pet has been added!')
            res.status(200).send(pet)
        })
        .catch(err => {
            res.status(404).send('Failed to add pet to db');
            console.log(err)
        });

}
const getPets = (req, res, next) => {
    Pet.findAll().
        then(pets => {
            logger.info("All pets have been fetched")
            res.status(200).send(pets)
        })
        .catch(
            err => {
                res.status(404)
                    .send("Pets could not be fetched from db");
                console.log(err)
            }
        )
}

const getPetById = (req, res, next) => {
    Pet.findOne({where:{id:req.params.id}}).
        then(
           pet => {
                logger.info("Pet has been found by id");
                res.status(200).send(pet)
            }
        ).catch(
            err => {
                res.status(404).send("Failed to get pet by id");
                console.log(err);
            }
        )
}


module.exports = {
    createPet,
    getPets,
    getPetById
}
