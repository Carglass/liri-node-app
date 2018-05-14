require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");
//var client = new Twitter(keys.twitter);
var request = require("request");

var command = process.argv[2];
var inputData;
if (process.argv[3]) {
  inputData = process.argv[3].replace(/ /g, "_");
}

function liriTwitter() {
  var params = { screen_name: "nodejs" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (let i = 0; i < 20; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
}

function liriSpotify(song) {
  spotify
    .search({ type: "track", query: song })
    .then(function(response) {
      console.log(response.tracks.items[0].artists[0].name);
      console.log(response.tracks.items[0].name);
      console.log(response.tracks.items[0].external_urls.spotify);
      console.log(response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      spotify
        .search({ type: "track", query: "The Sign Ace of Base" })
        .then(function(response) {
          console.log("We did not find your song, but we foudn the sign!");
          console.log(response.tracks.items[0].artists[0].name);
          console.log(response.tracks.items[0].name);
          console.log(response.tracks.items[0].external_urls.spotify);
          console.log(response.tracks.items[0].album.name);
        });
    });
}

function liriMovie(movie) {
  request(
    "http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + movie,
    function(error, response, body) {
      if (JSON.parse(body).Response === "False") {
        request(
          "http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=mr_nobody",
          function(error, response, body) {
            // TODO: it seems it does not return an error when it finds nothing...

            //just a test
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(
              JSON.parse(body).Ratings[0].Source +
                " rating: " +
                JSON.parse(body).Ratings[0].Value
            );
            console.log(
              JSON.parse(body).Ratings[1].Source +
                " rating: " +
                JSON.parse(body).Ratings[1].Value
            );
            console.log(
              JSON.parse(body).Ratings[2].Source +
                " rating: " +
                JSON.parse(body).Ratings[2].Value
            );
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
          }
        );
      } else {
        console.log(JSON.parse(body));
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(
          JSON.parse(body).Ratings[0].Source +
            " rating: " +
            JSON.parse(body).Ratings[0].Value
        );
        console.log(
          JSON.parse(body).Ratings[1].Source +
            " rating: " +
            JSON.parse(body).Ratings[1].Value
        );
        console.log(
          JSON.parse(body).Ratings[2].Source +
            " rating: " +
            JSON.parse(body).Ratings[2].Value
        );
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);
      }
    }
  );
}

function liriRandom() {
  fs.readFile("./random.txt", "utf-8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    if (dataArr[0] === "do-what-it-says") {
      console.log("That's a trap for Siri, I am better :D");
    } else {
      execCommand(dataArr[0], dataArr[1]);
    }
  });
}

function execCommand(commandInput, input) {
  if (commandInput === "my-tweets") {
    liriTwitter();
  } else if (commandInput === "spotify-this-song") {
    liriSpotify(input);
  } else if (commandInput === "movie-this") {
    liriMovie(input);
  } else if (commandInput === "do-what-it-says") {
    liriRandom(input);
  }
}

execCommand(command, inputData);
