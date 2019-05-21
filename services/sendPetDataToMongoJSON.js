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
        if (resp.subscriptions == 'undefined') {
            res.status(200).send('Pet added to mongodb');
        } else {
            rp({
                    method: 'POST',
                    url: 'https://postman-echo.com/post',
                    body: req.body.petData,
                    json: true
                })
                .then((resp) => res.send(resp))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};

module.exports = {
    forwardJsonPetData
}