const rp = require('request-promise');
const csv = require('csvtojson');


// CREATE PET, SEND AS JSON - FROM .csv FILE
let fileToJsonCreatePet = (req, res) => {

    let jsonData = csv().fromString(req.file.buffer.toString()).then(jsonObj => {
        return jsonObj;
    });

    rp({
        method: 'POST',
        url: 'https://httpbin.org/post',
        body: {
            petData: jsonData
        },
        json: true
    }).then((resp) => {
        if (resp.subscriptions === undefined) {
            res.status(200).send('Pet added to mongodb');
        } else {
            rp({
                    method: 'POST',
                    url: 'https://postman-echo.com/post',
                    body: req.body.petData,
                    json: true
                })
                .then(() => res.send('Pet was added to mongodb and mysql'))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};



// FILE TO JSON - DELETE PET
let fileToJsonDeletePet = (req, res) => {

    let jsonData = csv().fromString(req.file.buffer.toString()).then(jsonObj => {
        return jsonObj;
    });

    rp({
        method: 'DELETE',
        url: 'https://postman-echo.com/delete',
        body: {
            petData: jsonData
        },
        json: true,
    }).then((resp) => {
        if (resp.subscriptions === undefined) {
            res.status(200).send(`Pet with id:${req.params.id} successfully deleted from MongoDB`);
        } else {
            rp({
                    method: 'DELETE',
                    url: 'https://httpbin.org/delete',
                    body: req.params.petId,
                    json: true
                })
                .then(() => res.send(`Pet with id:${req.params.id} successfully deleted from MySQL and MongoDB`))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};



// UPDATE PET - FROM FILE TO JSON
let fileToJsonUpdatePet = (req, res) => {

    let jsonData = csv().fromString(req.file.buffer.toString()).then(jsonObj => {
        return jsonObj;
    });

    rp({
        method: 'PUT',
        url: 'https://httpbin.org/put',
        body: {
            petData: req.body.petId,
            newPetData: jsonData
        },
        json: true,
    }).then((resp) => {
        if (resp.subscriptions === undefined) {
            res.status(200).send(`Pet with id:${req.body.petId} successfully updated in MongoDB`);
        } else {
            rp({
                    method: 'PUT',
                    url: 'https://postman-echo.com/put',
                    body: {
                        pedId: req.body.petId,
                        newPetData: req.body.newPetData
                    },
                    json: true
                })
                .then((resp) => res.send(`Pet with id:${req.body.petId} has been updated in MySQL and MongoDB`))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};


module.exports = {
    fileToJsonCreatePet,
    fileToJsonDeletePet,
    fileToJsonUpdatePet
}