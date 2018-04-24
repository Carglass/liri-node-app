# liri-node-app

a simple node application to retrieve information on social media

####First you will need to configure the application with your profiles using the `dot-env` package

The application takes in a first argument to select the function that you want to use:

* `my-tweets` will log your 20 most recent tweets
* `spotify-this-song` will return some information about the song that you indicate as the next parameter
* `movie-this` will return some information about the movie that you indicate as the next parameter
* `do-what-it-says` will parse the random.txt file and execute the command that's written in it
