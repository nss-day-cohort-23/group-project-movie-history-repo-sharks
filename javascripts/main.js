'use strict';

console.log("hello");

const fbURL = `https://reposharks.firebaseio.com`;
const $ = require(`jquery`);
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');

function getMovies(uid) {
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

function deleteMovie(id) {
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

