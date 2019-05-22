const express = require('express');
const {
    forwardJsonPetData,
    deletePetJson,
    updatePetJson
} = require('../services/sendPetDataToMongoJSON');

const upload = require('../util/multer-config');
const csv = require('csvtojson');

const router = express.Router();

router.post('/json', forwardJsonPetData);
router.delete('/json/:id', deletePetJson);
router.put('/json', updatePetJson);


router.post("/file", upload.single('fileUpload'), (req, res) => {
    console.log(req.file);
    res.send(req.file.buffer.toString());
});

module.exports = router;