const express = require('express')
const router = express.Router();

const {
    getAllSubscriptions,
    getSubscriptionByID,
    createSubscription,
    deleteSubscription,
    updateSubscription,
    checkSubscription
} = require('../services/subscriptionServices');

router.get('/', getAllSubscriptions);
router.get('/:id', getSubscriptionByID);
router.put('/', updateSubscription);
router.post('/', createSubscription);
router.delete('/:id', deleteSubscription);
router.post('/check', checkSubscription);

module.exports = router;