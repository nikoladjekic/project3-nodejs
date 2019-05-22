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

const {
    checkSubscription
} = require('../services/subscriptionServices');


router.post('/', createPet);
router.delete('/:id', verifyToken, isAuth, checkSubscription, deletePetById);
router.put('/', verifyToken, isAuth, checkSubscription, updatePet);
router.get('/all', getAllPets);
router.get('/:id', getPetById);

module.exports = router;