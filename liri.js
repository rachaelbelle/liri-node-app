require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var choice = process.argv[2];
var details = process.argv[3];
var Spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment")


// console.log(choice);
if (choice === "spotify-this-song") {
    // console.log("spotify");
    spotifyThis();
} else if (choice === "concert-this") {
    // console.log("concert")
    concert();
} else if (choice === "movie-this") {
    movie();
    console.log("movie")
} else if (choice === "do-what-it-says") {
    something();
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
        // console.log(JSON.stringify(data.tracks.items));
        console.log("Artists Name : " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name : " + data.tracks.items[0].album.name);
        console.log("Preview Link : " + data.tracks.items[0].external_urls.spotify);
        console.log("Album Name : " + data.tracks.items[0].name);
    });
}

function concert() {
    var bandsInTown = "https://rest.bandsintown.com/artists/" + details + "/events?app_id=codingbootcamp";
    // console.log(bandsInTown)
    axios.get(bandsInTown).then(function (response) {
        var data = response.data
        // console.log(JSON.stringify(data));

        //  console.log(response.data)
        //  console.log("console logged" + response.data.Venue)
        console.log("this worked: " + data.venue.name)
    }).catch(function (err) {
        console.log("err");
    });
}
// I have tried everything I can think of and this still will not work.  I am unsure of
// how to move past it.


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
        console.log("err");
    });
}

function something() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });
};
