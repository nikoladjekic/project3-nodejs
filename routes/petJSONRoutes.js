const express = require('express');
const { forwardJsonPetData, deletePetJson, updatePetJson } = require('../services/sendPetDataToMongoJSON');

const router = express.Router();

router.post('/json', forwardJsonPetData);
router.delete('/json/:id', deletePetJson);
router.put('/json', updatePetJson);

module.exports = router;