'use strict';

const $ = require(`jquery`);


//Movie Database Module
let movieDB = require(`./config/mdb-creds`);
let moviesAPIKey = movieDB.apiKey;
let moviesURL = movieDB.authDomain;


function getMovies(searchedMovie) {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${moviesAPIKey}&query=${searchedMovie}`
        })
            .done(data => {
            resolve(data);
        })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
} 
    
// getMovies.then ((searchedMovie) => {
//     console.log(getMovies("forrest gump"));
// });

// console.log(getMovies("forrest gump"));
//GOT THIS MESSAGE
// The SSL certificate used to load resources from https://api.themoviedb.org will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.


//Firebase Data Module
const fbURL = `https://reposharks.firebaseio.com`;
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');

function getUsersMovies(uid) {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `${fbURL}.json?orderBy="uid"&equalTo="${uid}"`
        })
            .done(movies => {
                resolve(movies);
            })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
}

function deleteUsersMovie(id) {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/${id}.json`,
        })
            .done(data => {
                resolve(data);
            })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
}

function addMovie(movie) {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `${fbURL}.json`,
            method: "POST",
            data: JSON.stringify(movie)
        })
            .done(movieId => {
            resolve(movieId);
        });
    });
}

//User log in and log out

firebase.auth().onAuthStateChanged(() => {
    console.log("Who's this?", firebase.auth().currentUser);
});

$("#signin-btn").click(() => {
    auth
        .authUser()
        .then(function(result) {
            let user = result.user;
            console.log("user", user);
            //have function here that displays user's movies
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
});

$("#signout-btn").click( () => {
    auth.logout()
    .then( () => {
        console.log("logged out", firebase.auth().currentUser);
    });
});
