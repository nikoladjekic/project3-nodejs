var app = require('../../app');
const sequelize = require('../../database/db');

// const dotenv = require('dotenv');
// dotenv.config();

sequelize.sync().then(result => {
    app.listen(4000);
}).catch(err => {
    console.log(err);
})
