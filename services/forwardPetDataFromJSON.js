let rp = require('request-promise');

let forwardJsonPetData = (req, res) => {
    rp({
        method: 'POST',
        url: 'https://postman-echo.com/post',
        body: {
            petData: req.body.petData
        },
        json: true,
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
                .then((resp) => res.send('Pet was added to mongodb and mysql'))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};

let deletePetJson = (req, res) => {
    rp({
        method: 'DELETE',
        url: 'https://postman-echo.com/delete',
        body: {
            petData: req.params.petId
        },
        json: true,
    }).then((resp) => {
        if (resp.subscriptions === undefined) {
            res.status(200).send('Pet deleted from mongodb');
        } else {
            rp({
                    method: 'DELETE',
                    url: 'https://postman-echo.com/delete',
                    body: req.params.petId,
                    json: true
                })
                .then((resp) => res.send('The pet was deleted in mysql and mongodb'))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};

let updatePetJson = (req, res) => {
    rp({
        method: 'PUT',
        url: 'https://postman-echo.com/put',
        body: {
            petData: req.body.petId,
            newPetData: req.body.newPetData
        },
        json: true,
    }).then((resp) => {
        if (resp.subscriptions === 'undefined') {
            res.status(200).send('Pet updated in mongodb');
        } else {
            rp({
                    method: 'PUT',
                    url: 'https://postman-echo.com/put',
                    body: req.body.petId,
                    newPetData: req.body.newPetData,
                    json: true
                })
                .then((resp) => res.send('The pet was updated in mysql and mongodb'))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};

module.exports = {
    forwardJsonPetData,
    deletePetJson,
    updatePetJson,
}