const express = require('express');
const { forwardJsonPetData, deletePetJson } = require('../services/sendPetDataToMongoJSON');

const router = express.Router();

router.post('/json', forwardJsonPetData);
router.delete('/json/:id', deletePetJson);

module.exports = router;