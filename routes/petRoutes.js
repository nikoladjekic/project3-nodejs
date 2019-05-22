var express = require('express');
var router = express.Router();
const functions = require('../services/petServices')

router.post('/',functions.createPet);
router.get("/:id",functions.getPetById);
router.get("/",functions.getPets);
// router.put('/',functions.updatePet);
// router.delete('/:id',functions.deletePet);

module.exports = router;