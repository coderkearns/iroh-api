const quoteList = document.getElementById("quotes")
const searchBySelect = document.getElementById("type");
const searchInput = document.getElementById("search");
const randomButton = document.getElementById("random");

async function createLi(quote) {
    const res = await fetch("/api/episodes/" + quote.episode)
    const episode = await res.json()
    let li = document.createElement('li');
    li.innerHTML = `<span class="id">${quote.id}.</span> <span class="quote">${quote.quote}</span><br><span class="episode"> - ${episode.name}, ${episode.show}</span>`;
    return li;
}

async function setQuotes(quotes) {
    quoteList.innerHTML = "";
    const promises = quotes.map(createLi);
    const lis = await Promise.all(promises);
    lis.forEach(li => quoteList.appendChild(li));
}

function fetchQuotes(amount = 20) {
    fetch("/api/quotes/?limit=" + amount)
        .then(res => res.json())
        .then(setQuotes);
}

function fetchQuotesByTags(tags) {
    fetch("/api/quotes/tags/" + tags.join(","))
        .then(res => res.json())
        .then(setQuotes);
}

function fetchQuotesByText(text) {
    fetch("/api/quotes/text/" + text)
        .then(res => res.json())
        .then(setQuotes);
}

function fetchRandomQuote(e) {
    e.preventDefault();
    fetch("/api/random/quote")
        .then(res => res.json())
        .then(quote => setQuotes([quote]));
}

function getType() {
    return searchBySelect.value;
}

function onInputChange(e) {
    let type = getType();
    let text = searchInput.value;
    if (type === "tag") {
        fetchQuotesByTags(text.split(", "));
    } else if (type === "quote") {
        fetchQuotesByText(text);
    }
}

searchInput.addEventListener("input", onInputChange);
randomButton.addEventListener("click", fetchRandomQuote);

// fetch all quotes on page load
fetchQuotes();