const app = require('../../app');
const server = require('../../config').server;
// const db = require('../../database/db');


const port = (server.port || 3000);


app.listen(port, () => {
    console.log(`Express server started, listening on port ${port}`);
});
