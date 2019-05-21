const express = require('express')
const router = express.Router();

const {
    getAllSubscriptions,
    getSubscriptionByID
} = require('../services/subscriptionServices');



router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionByID);

module.exports = router;