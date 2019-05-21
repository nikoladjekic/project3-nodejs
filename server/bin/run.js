"use strict";

const app = require('../../app');
const serverPort = require('../../util/config');


app.listen((serverPort || 3000), () => {
    console.log(`Express server started, listening on port ${serverPort}`);
});
