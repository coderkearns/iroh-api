const Table = require('./table');

const data = require("../data.json")

const db = {
    episodes: new Table("episodes", data.episodes),
    tags: new Table("tags", data.tags),
    quotes: new Table("quotes", data.quotes),
}

module.exports = db;