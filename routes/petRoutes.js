const express = require('express');

const router = express.Router();

const {
    createPet,
    getPetById,
    getAllPets,
    updatePetById,
    deletePet
} = require('../services/petServices');



router.post('/', createPet);
router.get('/find/:id', getPetById);
router.get('/all', getAllPets);
router.put('/update/:id', updatePetById);
router.delete('/delete/:id', deletePet);



module.exports = router;