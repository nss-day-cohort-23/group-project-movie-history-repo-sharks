'use strict';

const $ = require(`jquery`);
const fbURL = `https://reposharks.firebaseio.com/movies`;
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');
let movieFactory = require('./movie-factory');
let searchedTerm = "";
let controller = require('./controller');


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



$(document).on("click", "#watchlist", function(){
    console.log('hello');
    let currentUser = firebase.auth().currentUser;
    console.log('currentUser',currentUser);
    if (currentUser) {
        console.log('added to watchlist');
        console.log("parentNode", document.getElementById("watchlist").parentNode);
        let movieId = document.getElementById("watchlist").parentNode.id;
        let movieTitle = document.getElementById("watchlist").parentNode.title;
        console.log('movieId = ',movieId);
        controller.addMovieObjectToWatchlist(movieId, currentUser.uid, movieTitle);
    } else
    alert("Please log in to continue..");
});

function listUsersMovies(movieData) {
    console.log("user movies", movieData);
    let userMovieArr = [];
    let keys = Object.keys(movieData);
    keys.forEach(key => {
        movieData[key].id = key;
        userMovieArr.push(movieData[key]);
    });
    console.log("user movie arr: ", userMovieArr);
}

function displayUserMovies(uid) {
    movieFactory.getUsersMovies(uid)
    .then(movieData => {
        listUsersMovies(movieData);
    });
}

$(document).on("click", "#showWatched", function(){
    let currentUser = firebase.auth().currentUser;
    console.log('currentUser',currentUser);
    if (currentUser != undefined) {
        console.log('pressed watched button');
        console.log("current user", currentUser);
        displayUserMovies(currentUser.uid);
        // controller.getUsersWatchedMovies();
    }
});

//User clicked on "show untracked button"
$(document).on("click", "#showUntracked", function () {
    let currentUser = firebase.auth().currentUser;
    if (currentUser){

    } else
    alert("Please log in to continue..");
});

$(document).on("click", "#showFavorites", function(){
    let currentUser = firebase.auth().currentUser;
    console.log('currentUser',currentUser);
    if (currentUser != undefined) {
        console.log('pressed favorites button');
    } else
    alert("Please log in to continue..");
});


//User clicked on "show unwatched button"
$(document).on("click", "#showUnwatched", function () {
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
        controller.showUnwatchedMovies(searchedTerm, currentUser.uid);  
    } else
    alert("Please log in to continue..");
});

let userText = document.getElementById("search");
userText.addEventListener("keypress", function (e) {
    var key = e.keyCode;
    if (key === 13) {
        searchedTerm = userText.value;
        controller.searchedMovie(searchedTerm);
    }
});