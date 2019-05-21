const express = require('express');
const { forwardJsonPetData } = require('../services/sendPetDataToMongoJSON');

const router = express.Router();

router.post('/json', forwardJsonPetData);

module.exports = router;