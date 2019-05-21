const express = require('express')
const router = express.Router();

const {
    addUser
} = require('../services/userServices');


router.post('/', addUser);
// router.get('/all', getAllUsers);
// router.get('/login', getToken);
// router.put('/', updateUser);
// router.delete('/:id', deleteUser)

module.exports = router;