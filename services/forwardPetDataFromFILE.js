const rp = require('request-promise');
const csv = require('csvtojson');


// CREATE PET, SEND AS JSON - FROM .csv FILE
let fileToJsonCreatePet = (req, res) => {
    csv().fromString(req.file.buffer.toString()).then(jsonObj => {
        res.send(jsonObj);
    });
};



module.exports = {
    fileToJsonCreatePet
}