const express = require('express')
const router = express.Router();

const {
    getAllSubscriptions,
    getSubscriptionByID,
    createSubscription,
    deleteSubscription
} = require('../services/subscriptionServices');

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionByID);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;