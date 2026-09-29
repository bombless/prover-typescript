# Conditional static responses

The preview server includes a content-derived `ETag` on successful file responses. A `GET` or `HEAD` with a matching `If-None-Match` returns `304 Not Modified` without a body. Strong tags, weak tags, comma-separated tag lists, and `*` are supported. Navigation fallback uses the validator for `index.html`.

`HEAD` shares the corresponding `GET` content type, byte length, and validator. `Cache-Control: no-cache` tells clients to revalidate before reusing a cached response, so rebuilding an asset changes its validator immediately, even when its byte length is unchanged.

The local preview server reads each requested file into memory once, hashes that buffer, and sends those same bytes. Conditional requests save response bandwidth; they still read and hash the file on the server. Buffering is intended for the project's small static preview assets rather than large file hosting. Missing builds and read failures remain error responses without cache validators.
