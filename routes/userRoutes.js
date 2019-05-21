const express = require('express')
const router = express.Router();

const {
    addUser,
    getAllUsers,
    getUserByID,
    deleteUser,
    updateUser,
    login
} = require('../services/userServices');


router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.get('/login', login);
router.put('/', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;