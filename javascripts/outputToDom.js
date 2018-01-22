'use strict';
let $ = require('jquery');
let movieFactory = require('./movie-factory');
let controller = require('./controller');
//also need to get cast
//then we want to append the id to the watchlist button, and when it's clicked, it sends id to firebase
function getCast (movieId) {
    movieFactory.getMovieCredits(movieId)
    .then(function(movie) {
        let movieCast = movie.cast;
        console.log("movie cast", movie.cast);
        for (let i=0; i < 3; i++) {
            console.log("movie cast", movieCast.cast[i]);
        }
        // for (let i=0; movieCast.cast < 3; i++) {
        // }
    });
}

module.exports.printResults = (searchedMovie) => {
    let searchedMovieArray = searchedMovie.results;
    console.log(searchedMovieArray);
    searchedMovie.results.forEach((movie) => {
        let movieCast = controller.getCast(+movie.id);
        //have the div id of the card be the movie id so you have access to it
        $("#movieCards").append(
            `<div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="card" id=${+movie.id} style="width: 18rem;">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster">
                        <a href="#" class="card-link" id="delete">Delete</a>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="Title">${movie.title}</li>
                            <li class="list-group-item" id="Date Released">${movie.release_date}</li>
                            <li class="list-group-item" id="Cast">${movieCast}</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link" id="watchlist">Add To Watchlist</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
        );
    });
};