const express = require('express');
const upload = require('../util/multer-config');

const {
    forwardJsonPetData,
    deletePetJson,
    updatePetJson
} = require('../services/forwardPetDataFromJSON');

const {
    fileToJsonCreatePet,
    fileToJsonDeletePet,
    fileToJsonUpdatePet
} = require('../services/forwardPetDataFromFILE');


const router = express.Router();


// forward json data
router.post('/json', forwardJsonPetData);
router.delete('/json/:id', deletePetJson);
router.put('/json', updatePetJson);


// read from file and forward as json object
router.post("/file", upload.single('fileUpload'), fileToJsonCreatePet);
router.delete("/file/:id", upload.single('fileUpload'), fileToJsonDeletePet);
router.put("/file", upload.single('fileUpload'), fileToJsonUpdatePet);



module.exports = router;