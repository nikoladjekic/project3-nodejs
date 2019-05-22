const express = require('express');
const {
    forwardJsonPetData,
    deletePetJson,
    updatePetJson
} = require('../services/forwardPetDataFromJSON');

const {
    fileToJsonCreatePet
} = require('../services/forwardPetDataFromFILE');

const upload = require('../util/multer-config');

const router = express.Router();


// forward json data
router.post('/json', forwardJsonPetData);
router.delete('/json/:id', deletePetJson);
router.put('/json', updatePetJson);


// read from file and forward as json object
router.post("/file", upload.single('fileUpload'), fileToJsonCreatePet);


module.exports = router;