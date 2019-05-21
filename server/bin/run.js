"use strict";

const app = require('../../app');
const server = require('../../util/config').server;


const port = (server.port || 3000);


app.listen(port, () => {
    console.log(`Express server started, listening on port ${port}`);
});
