'use strict';

const $ = require(`jquery`);
const fbURL = `https://reposharks.firebaseio.com/movies`;
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');
let movieFactory = require('./movie-factory');
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
controller.pressingEnter(userText.value);