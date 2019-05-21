const express = require('express');

const path = require('./util/path');
const connection = require('./database/db');
const petRoutes = require('./routes/petRoutes');;

const app = express();

app.use(express.json().urlencoded({
    extended: false
}));


app.use('/api/pets', petRoutes);


// if no route matches, send 404 response
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

module.exports = app;