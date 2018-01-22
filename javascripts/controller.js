'use strict';
//this is where i manipulate data
//functions in the controller call functions in the factory
//also call output or display module


//USER SEARCH MODULE
//probably gonna have to have a if "#yourMovies" is checked, run function that gets your movies, else run get new movies function
let movieFactory = require('./movie-factory');
let outputToDom = require('./outputToDom');

let userText = document.getElementById("search");
let movieObject = {
    movieId: "",
    title: "",
    img: "",
    yearReleased: "",
    cast: "",
    userId: "",
    watchlist: false
};

//want to get movie id from search results

// let movieIdArray = [];

// function getMoviesId(searchedMovie) {
//     let keys = Object.keys(searchedMovie);
//     keys.forEach(key => {
//         searchedMovie[key].id = key;
//         movieIdArray.push(searchedMovie[key]);
//         console.log("movieIdArray", movieIdArray);
//     });
// }
//find a way to get movie data, get cast and put into movie data object, and 
let getCast = (movieData) => {
    movieFactory.getMovieCredits(movieData.id)
    .then(function(movie) {
        let top3Stars = "";
        let movieCast = movie.cast;
        if (movieCast.length !== 0) {
        for (let i=0; i < 3; i++) {
            console.log("movie stars", movieCast[i].name);
            top3Stars += `${movieCast[i].name}, `;
        }
    }
    // outputToDom.printResults();
    console.log("top 3 stars", top3Stars);
    outputToDom.printResults(movieData, top3Stars);
});
};

module.exports.pressingEnter = (searchedMovie) => {
    userText.addEventListener('keypress', function (e) {
        var key = e.keyCode;
        if (key === 13) {
            searchedMovie = userText.value;
            movieFactory.getMovies(searchedMovie)
            .then(function(movieData) {
                for (let i=0; i < 15; i++) {
                getCast(movieData.results[i]);
                console.log("movie Data id", movieData.results[0].id);
                }
            });
            userText.value = "";
        }
    });
};

// searchedMovie.results.forEach((movie) => {
//     let cast = controller.getCast(+movie.id);
//     console.log("cast", cast);
    //have the div id of the card be the movie id so you have access to it


