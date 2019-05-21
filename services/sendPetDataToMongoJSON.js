let rp = require('request-promise');

let forwardJsonPetData = (req, res) => {
    rp({
        method: 'POST',
        url: '',
        body: {
            petData: req.body.petData
        },
        json: true,
    }).then((resp) => {
        // expecting subscription info
        if (resp.subscriptions === 'null') {
            res.status(200).send('Pet added to mongodb');
        } else {
            rp({
                    url: '',
                    body: req.body.petData,
                })
                .then((resp) => res.send(resp))
                .catch((err) => res.send(err));
        }
    }).catch((err) => console.log(err));
};

module.exports = {forwardJsonPetData}