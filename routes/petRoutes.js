const express = require('express')
const router = express.Router();

const {
    createPet,
    deletePetById
} = require('../services/petServices');


router.post('/', createPet);
router.delete('/:id', deletePetById);

module.exports = router;