let rp = require('request-promise');

let apiOptions = {
    method: 'POST',
    url: '',
    body: null,
    json: true,

};

let forwardJsonPetData = (req, res) => {
    apiOptions.body = {
        petData: req.body.petdata
    };

    rp(apiOptions).then((resp) => {
        // expecting subscription info
    }).catch((err) => console.log(err));
};