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
module.exports.getCast = (movieId) => {
    movieFactory.getMovieCredits(movieId)
    .then(function(movie) {
        let movieCast = movie.cast;
        console.log("movie", movie);
        if (movieCast.length !== 0) {
        for (let i=0; i < 3; i++) {
            console.log("movie stars", movieCast[i].name);
        }
    }
    outputToDom.printResults();
        // for (let i=0; movieCast.cast < 3; i++) {
        // }
    });
};

module.exports.pressingEnter = (searchedMovie) => {
    userText.addEventListener('keypress', function (e) {
        var key = e.keyCode;
        if (key === 13) {
            console.log("enter key working");
            searchedMovie = userText.value;
            movieFactory.getMovies(searchedMovie)
            .then(function(movieData) {
                //movieData.forEach(movie => {
                    // getMoviesId(searchedMovie);
                    console.log(movieData);
                    outputToDom.printResults(movieData);
                // });
            });
            userText.value = "";
        }
    });
};



