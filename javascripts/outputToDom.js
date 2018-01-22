'use strict';
let $ = require('jquery');
let controller = require('./controller');
//also need to get cast
//then we want to append the id to the watchlist button, and when it's clicked, it sends id to firebase


module.exports.printResults = (movie, cast) => {
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
                            <li class="list-group-item" id="Cast">${cast}</li>
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
};