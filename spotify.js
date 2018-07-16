var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "8c0591a3af0c4e4085f51460f3d85c55",
    secret: "2a7ca24916344620bb1e0e039329796a"
});

module.exports = spotify;