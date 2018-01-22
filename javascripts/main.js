'use strict';

const $ = require(`jquery`);
const fbURL = `https://reposharks.firebaseio.com/movies`;
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');
let movieFactory = require('./movie-factory');


//User log in and log out

firebase.auth().onAuthStateChanged(() => {
    console.log("Who's this?", firebase.auth().currentUser);
});

$("#signin-btn").click(() => {
    auth
        .authUser()
        .then(function(result) {
            console.log("result", result);
            let user = result.user;
            console.log("user", user);
            //have function here that displays user's movies
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error message", errorMessage);
        });
});

$("#signout-btn").click( () => {
    auth.logout()
    .then( () => {
        console.log("logged out", firebase.auth().currentUser);
    });
});

//USER SEARCH MODULE
//probably gonna have to have a if "#yourMovies" is checked, run function that gets your movies, else run get new movies function

let userText = document.getElementById("userInput");

let pressingEnter = (searchedMovie) => {
    userText.addEventListener('keypress', function (e) {
    var key = e.keyCode;
        if (key === 13) {
            console.log("enter key working");
            searchedMovie = userText.value;
            movieFactory.getMovies(searchedMovie);
            // .then 
            userText.value = "";
        }
    });
};


pressingEnter(userText.value);