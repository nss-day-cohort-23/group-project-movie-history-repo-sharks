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

let userText = document.getElementById("search");
// controller.pressingEnter(userText);

$(document).on("click", "#watchlist", function(){
    console.log('hello');
    let currentUser = firebase.auth().currentUser;
    console.log('currentUser',currentUser);
    if (currentUser) {
        console.log('added to watchlist');
        let movieId = document.getElementById("watchlist").parentNode.id;
        console.log('movieId = ',movieId);
        controller.addMovieObjectToWatchlist(movieId, currentUser.uid);
    } else
        alert("Please log in to continue..");
});

$(document).on("click", "#showUntracked", function (){
    console.log('hello');
    let currentUser = firebase.auth().currentUser;
    if (currentUser){
        controller.showsUntrackedMovies(searchedTerm, currentUser.uid);
    } else
        alert("Please log in to continue..");
});

$(document).on("click", "#showUnwatched", function () {
    console.log('hello');
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {

    } else
        alert("Please log in to continue..");
});

userText.addEventListener("keypress", function (e) {
    var key = e.keyCode;
    if (key === 13) {
        searchedTerm = userText.value;
        controller.searchedMovie(searchedTerm);
    }
});