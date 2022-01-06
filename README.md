# iroh-api

This is a collection of everything said by Uncle Iroh in _Avatar: The Last Airbender_ and _Avatar: The Legend of Korra_.

## Who is Uncle Iroh?

The greatest person ever. (Add real stuff here)

## Tags

The API uses a tagging system to allow for easy searching and filtering.

The following tags are available:

-   **`iroh_jr`**: This API also includes quotes from Uncle Iroh's grandson, also named Iroh. Anything said by the younger iroh is tagged as `iroh_jr` and left out automatically from random endpoints and search results unless specifically requested.
-   **`to:<character>`**: Each quote is tagged with who Uncle Iroh is talking to. All names are lowercase and spaces are replaced with underscores (`_`). Quotes given to unnamed and unknown characters are tagged as `to:unknown`. When a bit is known about a character but not their name, they are tagged as both `to:unnamed` and `to:<general>`, like `to:fire_solider`. Examples: `to:zuko`, `to:aang`, `to:unknown`.
-   **`location:<location>`**: Each quote is tagged with where Iroh was when he said it. All names are lowercase and spaces are replaced with underscores (`_`). Quotes given in unknown locations or in the wilderness are tagged as `location:unknown`. Locations that are known to be _nearby_ a certain place are tagged as both `location:near_<place>` and `location:unknown`. As many locations as possible are tagged when multiple could fit. Examples: `location:zuko's_ship`, `location:unknown`, `location:spirit_world`, `location:near_ba_sing_se`.
-   **`wisdom`**: This tag is used to tag quotes that were supposed to be wise. _(All of Uncle Iroh's quotes are wise, obviously, but only those meant to be are tagged with `wise`.)_

The tag list is generated using [`generateTags.js`](generateTags.js).
