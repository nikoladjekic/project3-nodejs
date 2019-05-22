var express = require('express');
var router = express.Router();
const functions = require('../services/userServices')

router.post('/',functions.createUser);
router.get("/:id",functions.getUserById);
router.get("/",functions.getUsers);
router.put('/:id',functions.updateUser);
router.delete('/:id',functions.deleteUser);

module.exports = router;