"use strict";
//this is where i manipulate data
//functions in the controller call functions in the factory
//also call output or display module

//USER SEARCH MODULE
//probably gonna have to have a if "#yourMovies" is checked, run function that gets your movies, else run get new movies function
let movieFactory = require("./movie-factory");
let outputToDom = require("./outputToDom");

let userText = document.getElementById("search");


module.exports.addMovieObjectToWatchlist = (movieId, userId) =>{
    let userMovieObject = {};
    userMovieObject.id = movieId;
    userMovieObject.user = userId;
    userMovieObject.watched = false;
    userMovieObject.stars = 0;
    movieFactory.addMovie(userMovieObject)
    .then(function(movie) {
        console.log("movie", movie);
    });
};

//find a way to get movie data, get cast and put into movie data object, and
let getCast = movieData => {
  movieFactory.getMovieCredits(movieData.id)
  .then(function(movie) {
    let top3Stars = "";
    let movieCast = movie.cast;
    if (movieCast.length !== 0) {
      for (let i = 0; i < 3; i++) {
        top3Stars += `${movieCast[i].name}, `;
      }
    }
    console.log(movieData);
    outputToDom.printResults(movieData, top3Stars);
  });
};

module.exports.pressingEnter = searchedMovie => {
  userText.addEventListener("keypress", function(e) {
    var key = e.keyCode;
    if (key === 13) {
      searchedMovie = userText.value;
      movieFactory.getMovies(searchedMovie)
      .then(function(movieData) {
        //possibly make this clear search results a function that you call here.
        let output = document.getElementById("movieCards");
        output.innerHTML = "";
        for (let i = 0; i < 15; i++) {
          getCast(movieData.results[i]);
        }
      });
      userText.value = "";
    }
  });
};
