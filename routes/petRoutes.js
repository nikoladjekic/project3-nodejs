const express = require('express')
const router = express.Router();

const {
    createPet,
    deletePetById,
    updatePet,
    getAllPets,
    getPetById
} = require('../services/petServices');


router.post('/', createPet);
router.delete('/:id', deletePetById);
router.put('/', updatePet);
router.get('/all', getAllPets);
router.get('/:id', getPetById);

module.exports = router;