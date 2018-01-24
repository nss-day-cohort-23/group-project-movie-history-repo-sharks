'use strict';
// let $ = require('jquery');
module.exports.rateYo = () =>{

$(".rate").rateYo({
    starWidth: "20px",
    normalFill: "gray",
    ratedFill: "#f39c12",
    numStars: 10,
    fullStar: true
});

};

module.exports.getRating = (star) => {

    
 
    // this allows you to get a popup with the rating in integer form
    let rateClick = $(star).rateYo();
    console.log('rateclick',rateClick );
    
    //get rating 
    let rating = rateClick.rateYo("rating");

    // rating * 2 will give you the correct integer.
    // this had to be done because the rating is based on 5 stars
    console.log(rating * 2);
    return +rating * 2;

};
