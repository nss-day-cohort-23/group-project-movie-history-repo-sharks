'use strict';
//this is where i manipulate data
//functions in the controller call functions in the factory
//also call output or display module


//USER SEARCH MODULE
//probably gonna have to have a if "#yourMovies" is checked, run function that gets your movies, else run get new movies function
let movieFactory = require('./movie-factory');

let userText = document.getElementById("search");

module.exports.pressingEnter = (searchedMovie) => {
    userText.addEventListener('keypress', function (e) {
    var key = e.keyCode;
        if (key === 13) {
            console.log("enter key working");
            searchedMovie = userText.value;
            movieFactory.getMovies(searchedMovie)
            .then(function(movieData) {
                console.log("movieData", movieData);
            });
            userText.value = "";
        }
    });
};


