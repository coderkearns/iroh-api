const express = require('express');
const api = express.Router();

const dbWithJr = require('./db');
const db = { episodes: dbWithJr.episodes, tags: dbWithJr.tags, quotes: dbWithJr.quotes.filter(item => !item.tags.includes("iroh_jr")) };

/* /////// ROUTES /////// */
// GET /api/ - return endpoints as { episodes: <episodes.count>, quotes: <quotes.count>, tags: <tags.count> }
// GET /api/count/              - return total number of quotes, episodes, and tags. Same as /api/
// GET /api/count/episodes      - return total number of episodes
// GET /api/count/quotes        - return total number of quotes
// GET /api/count/tags          - return total number of tags
// GET /api/tags/?limit=20      - return all tags as an array
// GET /api/tags/:id            - return a single tag as an object
// GET /api/episodes/?limit=20  - return all episodes as array of simplified objects { id: <id>, name: <name> }
// GET /api/episodes/:id        - return episode specified id or error if not found
// GET /api/quotes/?limit=20    - return all quotes as array of simplified objects { id: <id>, quote: <quote> }
// GET /api/quotes/tags/:tags   - return all quotes with specified tag or tags
// GET /api/quotes/text/:text   - return all quotes that includes the specified text
// GET /api/quotes/:id          - return quote specified id or error if not found
// GET /api/random/quote        - return a random quote
// GET /api/random/quote/:tags   - return a random quote with specified tag or tags
// GET /api/random/episode      - return a random episode
// GET /api/random/tag          - return a random tag


// GET /api/
api.get("/", (req, res) => {
    res.json({
        episodes: db.episodes.count,
        quotes: db.quotes.count,
        tags: db.tags.count,
    });
});

// GET /api/count/
api.get("/count/", (req, res) => {
    res.json({
        episodes: db.episodes.count,
        quotes: db.quotes.count,
        tags: db.tags.count,
    });
});

// GET /api/count/episodes
api.get("/count/episodes", (req, res) => {
    res.json({ count: db.episodes.count });
});

// GET /api/count/quotes
api.get("/count/quotes", (req, res) => {
    res.json({ count: db.quotes.count });
});

// GET /api/count/tags
api.get("/count/tags", (req, res) => {
    res.json({ count: db.tags.count });
});

// GET /api/tags/?limit=20
api.get("/tags/", (req, res) => {
    const limit = isNaN(Number(req.query.limit)) ? 20 : Number(req.query.limit);
    res.json(db.tags.mapArray(tag => tag.name).slice(0, limit));
});


// GET /api/episodes/?limit=20
api.get("/episodes/", (req, res) => {
    // Only find the first 20 items, unless the query string has limit=<number>
    const limit = isNaN(Number(req.query.limit)) ? 20 : Number(req.query.limit);
    res.json(db.episodes.mapArray(episode => ({ id: episode.id, name: episode.name })).slice(0, limit));
});

// GET /api/quotes/?limit=20
api.get("/quotes/", (req, res) => {
    // Only find the first 20 items, unless the query string has limit=<number>
    const limit = isNaN(Number(req.query.limit)) ? 20 : Number(req.query.limit);
    res.json(db.quotes.mapArray(quote => ({ id: quote.id, quote: quote.quote })).slice(0, limit));
});

// GET /api/tags/:id
api.get("/tags/:id", (req, res) => {
    let tag = null

    if (isNaN(Number(req.params.id))) {
        // Try to find tag by name
        tag = db.tags.getOneWhere(item => item.name === req.params.id);
    } else {
        // Try to find tag by id
        tag = db.tags.get(parseInt(req.params.id));
    }

    if (tag) {
        res.json(tag);
    } else {
        res.status(404).json({ error: "Tag not found" });
    }
});

// GET /api/episodes/:id
api.get("/episodes/:id", (req, res) => {
    const episode = db.episodes.get(parseInt(req.params.id));
    if (episode) {
        res.json(episode);
    } else {
        res.status(404).json({ error: "Episode not found" });
    }
});

// GET /api/quotes/tags/:tags
api.get("/quotes/tags/:tags", (req, res) => {
    const tags = req.params.tags.split(",");
    const quotes = db.quotes.findWhere(quote => tags.every(tag => quote.tags.includes(tag)));
    res.json(quotes);
});

// GET /api/quotes/text/:text
api.get("/quotes/text/:text", (req, res) => {
    const quotes = db.quotes.findWhere(quote => quote.quote.includes(req.params.text));
    res.json(quotes);
})

// GET /api/quotes/:id
api.get("/quotes/:id", (req, res) => {
    const quote = db.quotes.get(parseInt(req.params.id));
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ error: "Quote not found" });
    }
});

// GET /api/random/quote
api.get("/random/quote", (req, res) => {
    const quote = db.quotes.random()
    res.json(quote);
});

// GET /api/random/quote/:tags
api.get("/random/quote/:tags", (req, res) => {
    const tags = req.params.tags.split(",");
    const quote = db.quotes.randomWhere(quote => tags.every(tag => quote.tags.includes(tag)));
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ error: "Quote not found" });
    }
});

// GET /api/random/episode
api.get("/random/episode", (req, res) => {
    const episode = db.episodes.random()
    res.json(episode);
});

// GET /api/random/tag
api.get("/random/tag", (req, res) => {
    const tag = db.tags.random()
    res.json(tag);
});

module.exports = api;
