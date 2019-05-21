"use strict";

const app = require('../../app');
const port = (require('../../util/config') || 3000);

app.listen(port, () => {
    console.log(`Express server started, listening on port ${port}`);
});
