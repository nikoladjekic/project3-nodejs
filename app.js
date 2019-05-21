const express = require('express');

const path = require('./util/path');
const petJsonRoutes = require('./routes/petJSONRoutes');

const app = express();

app.use(express.json());

app.use('/api/pets', petJsonRoutes);


// if no route matches, send 404 response
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

module.exports = app;