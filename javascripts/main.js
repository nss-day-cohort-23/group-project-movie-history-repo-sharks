'use strict';

const $ = require(`jquery`);

let movieDB = require(`./config/mdb-creds`);
let movies = movieDB.apiKey;
console.log(movies);

function getMovies(searchedMovies) {
    
} 



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

