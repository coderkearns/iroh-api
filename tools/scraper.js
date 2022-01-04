// Scrapes the transcripts from ALTA's fandom website.
const cheerio = require("cheerio")
const request = require("request-promise")
const fs = require("fs")
const episodes = require("./episodes.json")

const baseURL = "https://avatar.fandom.com"
const generalURL = baseURL + "/wiki/Avatar_Wiki:Transcripts"
const csvFile = "transcripts.csv"

const selectors = {
    episodeLinks: "tbody > tr > td > a",
    transcriptQuoteSpeaker: "tr > th",
    transcriptQuote: "tr > td"
}

let data = ""
request(generalURL).then(parseGeneralPage)

// Step 1: Request the general page
function parseGeneralPage(html) {
    data = html
    const $ = cheerio.load(data)
    const episodeLinks = getEpisodeLinks($)
    // Add the data from each episode page to the data variable IN ORDER
    Promise.all(episodeLinks.map(parseEpisodePage))
        .then(episodeData => writeToCSV(episodeData.join("\n")))
        .catch(err => console.log(err))
}

function getEpisodeLinks($) {
    // for each episode in the episodes.json file, get the link to the episode page by looking for an "a" tag with the episode's name as its text
    return episodes.map(episode => {
        const episodeLink = $(`a:contains("${episode.name}")`)
        return [episode.name, episodeLink.attr("href")]
    })
}

// Step 2: Parse an episode page
function parseEpisodePage([episodeName, episodeURL]) {
    console.log(`[ALTA Transcript Scraper] Parsing episode ${episodeName}`)
    // return the data from the episode page
    if (!episodeURL) return Promise.resolve("")
    return request(baseURL + episodeURL).then(html => parseEpisode(episodeName, html))
}

// Step 3: Parse an episode
function parseEpisode(episodeName, html) {
    const $ = cheerio.load(html)
    const quotes = Array.from($(selectors.transcriptQuoteSpeaker)).filter(e => e.children.length > 0).filter(e => !!e.children[0].data)
        .filter(element => element.children[0].data.toLowerCase().includes("iroh"))
        .map(element => {
            const quote = $(element).next().text()
            return createQuoteObject(quote, episodeName)
        })
    return createCSVlines(quotes)
}

function createQuoteObject(quoteText, episodeName) {
    return {
        episode: episodeName,
        quote: cleanQuote(quoteText)
    }
}

function cleanQuote(quoteText) {
    // All-in-one cleaner function.
    // First, strip spaces from the beginning and end of the string.
    // Then, remove all text within brackets. EX: "foo [bar] baz" -> "foo baz"
    // Then, replace any newlines or tabs with spaces.
    // Then, replace any instance of more than one space with a single space.
    // Then, remove any extra spaces before punctuation. EX: "wow ?" -> "wow?", "wow  ?" -> "wow?"
    return quoteText
        .trim() // Remove spaces from the beginning and end of the string.
        .replace(/\[[^\]]*\]/g, "") // Remove all text within brackets.
        .replace(/\r?\n|\r|\t/g, " ") // Replace newlines and tabs with spaces.
        .replace(/\s{2,}/g, " ") // Replace any instance of more than one space with a single space.
        .replace(/\s+([.,!?:;])/g, "$1") // Remove any extra spaces before punctuation.
}

// Step 4: Write the CSV file
function createCSVlines(quotes) {
    return quotes.map(quote => `${quote.episode.replace(",", "%2C")},${quote.quote}`).join("\n")
}

function writeToCSV(csvData) {
    fs.writeFileSync(csvFile, csvData)
}