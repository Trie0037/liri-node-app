require("dotenv").config();
var OMDBrequest = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
// var client = new Twitter(keys.twitter);
/** `my-tweets`

* `spotify-this-song`
  
* `movie-this`
  
* `do-what-it-says`*/
// Include the following packages
var client = require("./keys");
var request = require("request");
var fs = require("fs");

var command = process.argv[2];
var args = process.argv.slice(3).join("+");

run(command, args);

function run(cmd, arg) {
    switch (cmd) {
        case "my-tweets":
            tweets();
            break;
        case "spotify-this-song":
            spotify(arg);
            break;
        case "movie-this":
            if (!arg) {
                var defaultMovie = "Mr Nobody";
                movies(defaultMovie);
                return;
            }
            movies(arg);
            break;
        case "do-what-it-says":
            doIt(arg);
            break;
    }
}

function movies(title) {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    OMDBrequest(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}

function spotify(title) {
    var spotify = new Spotify(client.spotify);
    spotify.search({
        type: 'track',
        query: title
    }, function (err, data) {
        result = data.tracks.items[0];
        if (!err) {
            console.log("");
            console.log("Artist: " + result.album.artists[0].name);
            console.log("Song Name: " + result.name);
            console.log("Album: " + result.album.name);
            console.log("Link: " + result.external_urls.spotify);
        } else {
            return console.log("Error occured: " + err);
        }
    });
}

function tweets() {

    var twitter = new Twitter(client.twitter);
    twitter.get('statuses/home_timeline', function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {

                console.log("User Name:" + tweet.user.name);
                console.log("Tweet Time:" + tweet.created_at);
                console.log("Tweet Content:" + tweet.text);
            });
        } else {
            console.log("No tweets to show")
        }
    });
}


function doIt() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        var file = data.split(",");
        console.log(file[0], file[1]);
        run(file[0], file[1]);
        // var lines = data.split("\n");
        // var randomLine = lines[Math.floor(Math.random() * lines.length)];

        // console.log("node " + "liri.js " + randomLine)

    });

}