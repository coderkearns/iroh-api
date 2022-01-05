const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./api');
app.use('/api', api);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;