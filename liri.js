require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
var request = require('request');


var command = process.argv[2];

function liriSpotify(song){
    spotify.search({ type: 'track', query: song })
    .then(function(response) {
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].external_urls.spotify);
        console.log(response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function liriMovie(movie){
    request('http://www.omdbapi.com/?apikey=' + keys.omdb.key + '&t=' + movie, function (error, response, body) {
    if (error){
        console.log('error:', error);
     } else {
        console.log(JSON.parse(body).Title);
        console.log(JSON.parse(body).Year);
        console.log(JSON.parse(body).Ratings[0].Source + ' rating: ' + JSON.parse(body).Ratings[0].Value);
        console.log(JSON.parse(body).Ratings[1].Source + ' rating: ' + JSON.parse(body).Ratings[1].Value);
        console.log(JSON.parse(body).Ratings[2].Source + ' rating: ' + JSON.parse(body).Ratings[2].Value);
        console.log(JSON.parse(body).Country);
        console.log(JSON.parse(body).Language);
        console.log(JSON.parse(body).Plot);
        console.log(JSON.parse(body).Actors);
     }
});
}

if (command === 'my-tweets'){

} else if (command === 'spotify-this-song'){
    liriSpotify(process.argv[3]);
} else if (command === 'movie-this'){
    liriMovie(process.argv[3]);
} else if (command === 'do-what-it-says'){
    
}