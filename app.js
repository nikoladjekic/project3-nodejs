const express = require('express');

const path = require('./util/path');
const petRoutes = require('./routes/petRoutes');

const app = express();

app.use(express.json());

app.use('/api/pets', petRoutes);


// if no route matches, send 404 response
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

module.exports = app;