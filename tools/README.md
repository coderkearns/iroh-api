# tools

This is a collection of tools to create the API. The tools are:

-   [`scraper.js`](scraper.js): This file scrapes the quotes from each and every episode into the [`transcripts.csv`](transcripts.csv) file. It depends on the [`episodes.json`](episodes.json) file to know which episodes to scrape. You can modify [`episodes.json`](episodes.json) to add or remove episodes.
-   [`episodes.json`](episodes.json): This file contains the list of episodes and data on them. It is pre-created by me, and you shouldn't need to modify it unless you want certain episodes to be skipped in [`transcripts.csv`](transcripts.csv).
-   [`transcripts.csv`](transcripts.csv): This file contains the list of quotes from each episode. It is created by the [`scraper.js`](scraper.js) file.
-   [`compile.js`](compile.js): This file compiles the [`episodes.json`](episodes.json) and [`transcripts.csv`](transcripts.csv) files into a single JSON file, [`data.json`](data.json).
-   [`data.json`](data.json): This file contains the list of episodes and data on them, as well as the list of quotes from each episode. It is created by the [`compile.js`](compile.js) file. It powers the entire API.

## Notes

Using fandom's transripts to get quotes. You can find them at [avatar.fandom.com](https://avatar.fandom.com/wiki/Avatar_Wiki:Transcripts).
