// This file takes episodes.json and transcripts.csv, then compiles them into a single file.
const fs = require('fs').promises

run()

async function run() {
    console.log(`Reading episodes.json...`)
    const episodes = require('./episodes.json')
    console.log(`Reading transcripts.csv...`)
    const transcriptsFile = await fs.readFile('./transcripts.csv', 'utf8')
    const transcripts = parseCSV(transcriptsFile)
    console.log(`Merging...`)

    let newEpisodes = {}
    episodes.forEach(episode => {
        let key = episode.name.replace(",", "%2C")
        newEpisodes[key] = episode
    }
    )

    let data = {}
    data.episodes = episodes
    data.count = 0
    data.quotes = []
    transcripts.forEach(transcript => {
        if (!newEpisodes[transcript[0]]) {
            throw new Error(`Episode ${transcript[0]} not found`)
        }
        let e = newEpisodes[transcript[0]]
        let id = len(data.quotes)
        data.quotes.push({
            id,
            show: e.show,
            episode: `${e.book}.${e.episode}`,
            quote: strip(transcript[1]),
            tags: []
        })
    })
    data.count = len(data.quotes)
    data.tags = require("./tags.json")

    console.log(`Writing...`)
    await fs.writeFile('./data.json', JSON.stringify(data, null, 2))
    console.log(`Done!`)
}

function strip(s) {
    // If there are any spaces or tabs at the beginning or end of the string, remove them.
    return s.replace(/^\s+|\s+$/g, '')
}

function parseCSV(csv) {
    let lines = csv.split('\n')
    return lines.map(line => {
        let firstCell = line.split(',')[0]
        let allotherCells = line.split(',').slice(1).join(',')
        return [firstCell, allotherCells]
    })
}

function len(d) {
    // get the length of a object
    return Object.keys(d).length
}