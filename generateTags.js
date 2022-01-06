// GenerateTags.js
// Generates the JSON array of possible tags.

const data = require("./data.json")
const oldTags = [...new Set(data.quotes.reduce((tags, quote) => [...tags, ...quote.tags], []))]
//console.log(oldTags)

// Static tags
const presetTags = ["iroh_js", "wisdom"]

// A list of all characters Uncle Iroh talks to
let characters = ["unknown", "unnamed", "zuko", "zuko's crew", "fire soldier", "zhao", "earth soldier", "aang", "katara", "sokka"] // TODO: Complete this list

// A list of all locations
let locations = ["unknown", "zuko's ship", "south pole", "near southern water tribe", "zhao's harbor", "earth nation", "fire nation", "port"] // TODO: Complete this list


////////////////////////// Generate Tags //////////////////////////
characters = characters.map(character => "to:" + character.toLowerCase().replace(" ", "_"))
locations = locations.map(location => "location:" + location.toLowerCase().replace(" ", "_"))

const allTags = presetTags.concat(characters).concat(locations)
allTags.sort()

const tagObjects = allTags.map((tag, i) => ({ id: i, name: tag }))

console.log(JSON.stringify(tagObjects))