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
    Pet.findOne({ where: { id: req.params.id } }).
        then(
            pet => {
                if (!pet) { res.status(404).send("Pet with requested id does not exist") }
                else {
                    logger.info("Pet has been found by id");
                    res.status(200).send(pet)
                }
            }
        ).catch(
            err => {
                res.status(404).send("Failed to get pet by id");
                console.log(err);
            }
        )
}


const deletePet = (req, res, next) => {
    Pet.destroy({ where: { id: req.params.id } }).
        then(
            (pet) => {
                if (pet) {
                    logger.info("Pet has been successfully deleted");
                    res.status(200).send("Pet has been successfully deleted")
                }
                else { res.status(404).send("You provided bad id") }
            }
        ).catch(
            err => {
                res.status(404).send("Failed to delete pet by id");
                console.log(err);
            }
        )
}

const updatePet = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send("You have provided bad data")
    } else {
        Pet.update({
            name: req.body.name,
            category: req.body.category,
            status: req.body.status,
        },
            { where: { id: req.params.id } }).
            then(
                (pet) => {
                    if (pet) {
                        logger.info("Pet has been successfully updated");
                        res.status(200).send("Pet has been successfully updated")
                    }
                    else { res.status(404).send("You provided bad id mate") }
                }
            ).catch(
                err => {
                    res.status(404).send("Failed to update pet by id");
                    console.log(err);
                }
            )
    }
}




module.exports = {
    createPet,
    getPets,
    getPetById,
    deletePet,
    updatePet
}
