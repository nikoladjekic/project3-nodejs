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

const {
    checkSubscription
} = require('../services/subscriptionServices');

router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/login', login);
router.put('/', verifyToken, isAuth, checkSubscription, updateUser);
router.delete('/:id', verifyToken, isAuth, checkSubscription, deleteUser);

module.exports = router;