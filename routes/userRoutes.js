const express = require('express')
const router = express.Router();

const {
    addUser,
    getAllUsers,
    getUserByID,
    deleteUser,
    updateUser,
    login,
    verifyToken,
    isAuth
} = require('../services/userServices');


router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/login', login);
router.put('/', verifyToken, isAuth, updateUser);
router.delete('/:id', verifyToken, isAuth, deleteUser);

module.exports = router;