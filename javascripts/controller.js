"use strict";
//this is where i manipulate data
//functions in the controller call functions in the factory
//also call output or display module

//USER SEARCH MODULE
//probably gonna have to have a if "#yourMovies" is checked, run function that gets your movies, else run get new movies function
let movieFactory = require("./movie-factory");
let outputToDom = require("./outputToDom");
const $ = require("jquery");

let userText = document.getElementById("search");


module.exports.addMovieObjectToWatchlist = (movieId, userId, movieTitle) => {
  let userMovieObject = {
    movieTitle : movieTitle,
    movieId : movieId,
    user : userId,
    watched : false,
    stars : 0
  };
  movieFactory.addMovie(userMovieObject)
    .then(function(movie) {
        console.log("movie", movie);
    });
};

// module.exports.getUsersWatchedMovies = (userId) => {
//     movieFactory.getUsersMovies(uid)
//     .then(function(movie) {
//         console.log("users movie", movie);
//     });
// };

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
    outputToDom.printResults(movieData, top3Stars);
  });
};

module.exports.searchedMovie = searchedTerm => {
      movieFactory.getMovies(searchedTerm)
      .then(function(movieData) {
        //possibly make this clear search results a function that you call here.
        let output = document.getElementById("movieCards");
        output.innerHTML = "";
        for (let i = 0; i < 15; i++) {
          getCast(movieData.results[i]);
        }
      });
};

module.exports.showUnwatchedMovies = (searchTerm, currentUid) => {
  $("#movieCards").empty();
  console.log('searchTerm',searchTerm);
  movieFactory.getUsersMovies(currentUid)
  .then((userMovies)=>{
    console.log('userMovies',userMovies);
    let movieKeys = Object.keys(userMovies);
    console.log("movieKeys", movieKeys);
    movieKeys.forEach(movie => {
      if(userMovies[movie].movieTitle.includes(searchTerm)) {
        if(userMovies[movie].watched === false) {
          console.log("Found movie", userMovies[movie].movieTitle);
        }
      }
    });
  });
};