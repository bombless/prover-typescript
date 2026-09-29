# Static server methods

The local preview server supports `GET` and `HEAD`. Other methods return `405 Method Not Allowed` with `Allow: GET, HEAD`, including requests to navigation routes or missing paths. `HEAD` returns response metadata without a body.

This makes unsuccessful writes explicit for clients; the server provides no upload or mutation endpoint. Existing asset and navigation routing is unchanged for supported methods.
