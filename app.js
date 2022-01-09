const express = require('express');
const app = express();

/* Middleware */
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Frontend */
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/* API */
const api = require('./api');
app.use('/api', api);

module.exports = app;
