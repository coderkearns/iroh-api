const express = require('express');
const api = express.Router();

const data = require('./data.json');
/* /////// ROUTES /////// */
// GET /api/ - return endpoints as { episodes: <episodes.count>, quotes: <quotes.count>, tags: <tags.count> }
// GET /api/count/ - return total number of quotes, episodes, and tags. Same as /api/
// GET /api/count/episodes - return total number of episodes
// GET /api/count/quotes - return total number of quotes
// GET /api/count/tags - return total number of tags
// GET /api/tags/ - return all tags as an array
// GET /api/episodes/ - return all episodes as array of simplified objects { id: <id>, name: <name> }
// GET /api/episodes/:id - return episode specified id or error if not found
// GET /api/quotes/ - return all quotes as array of simplified objects { id: <id>, quote: <quote> }
// GET /api/quotes/tags/:tags - return all quotes with specified tag or tags as array
// GET /api/quotes/:id - return quote specified id or error if not found

// GET /api/
api.get("/", (req, res) => {
    res.json({
        episodes: data.episodes.length,
        quotes: data.quotes.length,
        tags: data.tags.length
    });
});

// GET /api/count/
api.get("/count/", (req, res) => {
    res.json({
        episodes: data.episodes.length,
        quotes: data.quotes.length,
        tags: data.tags.length
    });
});

// GET /api/count/episodes
api.get("/count/episodes", (req, res) => {
    res.json(data.episodes.length);
});

// GET /api/count/quotes
api.get("/count/quotes", (req, res) => {
    res.json(data.quotes.length);
});

// GET /api/tags/
api.get("/tags/", (req, res) => {
    res.json(data.tags);
});

// GET /api/episodes/
api.get("/episodes/", (req, res) => {
    res.json(data.episodes.map(episode => ({ id: episode.id, name: episode.name })));
});

// GET /api/episodes/:id
api.get("/episodes/:id", (req, res) => {
    const episode = data.episodes.find(episode => episode.id === parseInt(req.params.id));
    if (episode) {
        res.json(episode);
    } else {
        res.status(404).json({ error: "Episode not found" });
    }
});

// GET /api/quotes/
api.get("/quotes/", (req, res) => {
    res.json(data.quotes.map(quote => ({ id: quote.id, quote: quote.quote })));
});

// GET /api/quotes/tags/:tags
api.get("/quotes/tags/:tags", (req, res) => {
    const tags = req.params.tags.split(",");
    const quotes = data.quotes.filter(quote => tags.every(tag => quote.tags.includes(tag)));
    res.json(quotes);
});

// GET /api/quotes/:id
api.get("/quotes/:id", (req, res) => {
    const quote = data.quotes.find(quote => quote.id === parseInt(req.params.id));
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ error: "Quote not found" });
    }
});

module.exports = api;