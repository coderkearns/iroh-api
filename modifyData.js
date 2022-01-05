const fs = require('fs').promises;
let data = require('./data.json');

modify()
    .then(shouldSave => {
        if (shouldSave) fs.writeFile('./data.json', JSON.stringify(data, null, 2));
    })
    .catch(err => console.error(err));

async function modify() {
    data.quotes.forEach(quote => {
        const episode = data.episodes.find(episode => episode.id === quote.episode);
        // If the episode takes place in the show "TLOK" and is in the first season, add the tag "iroh_jr"
        if (episode.show === 'TLOK' && episode.season === 1) {
            quote.tags.push('iroh_jr');
            return
        }
        // If the episode's id is not 82, 85, or 97, add the tag "iroh_jr"
        if (episode.show === "TLOK") {
            if (episode.id !== 82 && episode.id !== 85 && episode.id !== 97) {
                quote.tags.push('iroh_jr');
            }
        }
    });
    return true
}