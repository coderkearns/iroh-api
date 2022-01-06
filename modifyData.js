const fs = require('fs').promises;
let data = require('./data.json');

modify()
    .then(shouldSave => {
        if (shouldSave) fs.writeFile('./data.json', JSON.stringify(data, null, 2));
    })
    .catch(err => console.error(err));

async function modify() {
    data.episodes = data.episodes.map(episode => {
        return { id: episode.id, name: episode.name, show: episode.show, book: episode.book, episode: episode.episode }
    });
    return true
}