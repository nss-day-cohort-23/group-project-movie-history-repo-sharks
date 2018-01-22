'use strict';
let $ = require('jquery');
//also need to get cast
//then we want to append the id to the watchlist button, and when it's clicked, it sends id to firebase


module.exports.printResults = (searchedMovie) => {
    let searchedMovieArray = searchedMovie.results;
    console.log(searchedMovieArray);
    searchedMovie.results.forEach((movie) => {
        //have the div id of the card be the movie id so you have access to it
        $("#movieCards").append(
            `<div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="${movie.poster_path}" alt="Movie Poster">
                        <a href="#" class="card-link" id="delete">Delete</a>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" id="Title">${movie.title}</li>
                            <li class="list-group-item" id="Date Released">${movie.release_date}</li>
                            <li class="list-group-item" id="Cast">Top Billed Cast</li>
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