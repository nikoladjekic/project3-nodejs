const express = require('express')
const router = express.Router();

const {
    createPet,
    deletePetById,
    updatePet,
    getAllPets,
    getPetById
} = require('../services/petServices');

const {
    verifyToken,
    isAuth
} = require('../services/userServices');


router.post('/', createPet);
router.delete('/:id', verifyToken, isAuth, deletePetById);
router.put('/', verifyToken, isAuth, updatePet);
router.get('/all', getAllPets);
router.get('/:id', getPetById);

module.exports = router;