require("dotenv").config();
var OMDBrequest = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var client = require("./keys");
var fs = require("fs");

var command = process.argv[2];
var args = process.argv.slice(3).join("+");

run(command, args);

function run(cmd, arg) {
    switch (cmd) {
        case "my-tweets":
            if(!arg) {
                var defaultTweets ="ESPN";
                tweets(defaultTweets);
                return;
            }
            tweets(arg);
            break;
        case "spotify-this-song":
            if(!arg) {
                var defaultSong = "California Love";
                spotify(defaultSong);
                return;
            }
            spotify(arg);
            break;
        case "movie-this":
            if (!arg) {
                var defaultMovie = "Dream A Little Dream";
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
            console.log("Rotten Tomatoes:"  + JSON.parse(body).Ratings[0].Value);
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
    twitter.get('statuses/home_timeline', function (error, tweets) {
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
    });
}

/*function doItt() {
    fs.appendFile('log.txt', 'new data', function (err) {
        if (err) {
      // append failed
        } else {
      // done
        }
    });
}*/