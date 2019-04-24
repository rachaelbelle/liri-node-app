require("dotenv").config();

var keys = require("./keys.js");
var axios = reqiure("axios");

var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);

var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

var omdb = "http://www.omdbapi.com/?apikey=trilogy&";

var choice = process.argv[2];
var details = process.argv[3];

if
