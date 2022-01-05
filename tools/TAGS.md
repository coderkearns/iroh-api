# tags

The Iroh API uses a tagging system to filter quotes.

## List

The following tags are available:

-   `to:<character>` - Quotes given to or in the presence of `<character>`. `<character>` is a lowercase word, with underscores instead of spaces. Unnamed or unknown characters are listed as `"to:<unknown>"` E.g. `"to:zuko"`, `"to:cabbage_man"`, `"to:unknown"`
-   `location:<location>` - Quotes given at `<location>`. Unknown locations are listed as `"location:unknown"`. When a nearby location is known, it is listed as both `"location:unknown"` _and_ `"location:near_<place>"`.
-   `iroh_jr` - Quotes given not by Uncle Iroh, but by his grandson General Iroh. By default, this tag is hidden in random quotes or quote lists.
-   `wisdom` - Quotes intended to be wise.
