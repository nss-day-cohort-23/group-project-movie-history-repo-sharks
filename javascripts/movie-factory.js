'use strict';

// let $ = require('jquery');
//Movie Database Module
let movieDB = require(`./config/mdb-creds`);
let moviesAPIKey = movieDB.apiKey;

//Gets movies from tmdb using a key word
module.exports.getMovies = (searchedMovie) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${moviesAPIKey}&language=en-US&query=${searchedMovie}&page=1&include_adult=false`
        })
            .done(data => {
            resolve(data);
        })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
};

//Gets ONE movie from tmdb using movie id
module.exports.getMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${moviesAPIKey}`
        }).done(movie => {
            resolve(movie);
        }).fail(error => {
            reject(error);
        });
    });
};

//Gets credits from tmdb for one movie using movie id
module.exports.getMovieCredits = (movieId) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${moviesAPIKey}&language=en-US&page=1&include_adult=false`
        })
            .done(data => {
            resolve(data);
        })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
}; 
    
// getMovies.then ((searchedMovie) => {
//     console.log(getMovies("forrest gump"));
// });

// console.log(getMovies("forrest gump"));
//GOT THIS MESSAGE
// The SSL certificate used to load resources from https://api.themoviedb.org will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.


//Firebase Data Module
const fbURL = `https://reposharks.firebaseio.com/movies`;
const firebase = require(`./config/fb-config`);
const auth = require('./user-factory');

module.exports.getUsersMovies = (uid) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `${fbURL}.json?orderBy="user"&equalTo="${uid}"`
        })
            .done(movies => {
                console.log('user movies -val', movies);
                resolve(movies);
            })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
};

module.exports.deleteUsersMovie = (id) => {
  return new Promise ((resolve, reject) => {
        $.ajax({
            url: `${fbURL}/${id}.json`,
            method: `DELETE`
        })
            .done(data => {
                resolve(data);
            })
            .fail(error => {
                console.log("somethings gone wrong", error.statusText);
                reject(error);
        });
    });
};

module.exports.addMovie = (movie) =>{
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
};
