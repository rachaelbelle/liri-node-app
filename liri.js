require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var choice = process.argv[2];
var details = process.argv[3];
var Spotify = require('node-spotify-api');

// console.log(choice);
if (choice === "spotify-this-song") {
    // console.log("spotify");
    spotifyThis();
} else if (choice === "concert-this") {
    console.log("concert")
} else if (choice === "movie-this") {
    movie();
    console.log("movie")
} else if (choice === "do-what-it-says") {
    console.log("something")
} else {
    console.log("invalid command")
}

function spotifyThis() {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: details }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
        console.log("Album Name : " + data.tracks.items[0].album.name)
    });
}
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


function movie() {
    var omdb = "http://www.omdbapi.com/?apikey=trilogy&t=" + details;
    console.log(omdb)
    axios.get(omdb).then(function (response) {
        var data = response.data
        console.log("Film Name : " + data.Title)
        console.log("Film Release Year : " + data.Year)
        console.log("IMBD Rating : " + data.imdbRating)
        console.log("Rotten Tomatoes Rating : " + data.Ratings[1].Value)
        console.log("Release Country : " + data.Country)
        console.log("Language of Film : " + data.Language)
        console.log("Plot of Film : " + data.Plot)
        console.log("Actors in Film : " + data.Actors)
    }).catch(function (err) {
        console.log(err);
    })
}
