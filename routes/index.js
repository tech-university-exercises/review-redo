const getReq = require('./getBooksAndRating');
const postReq = require('./getBooks');
const likeBook = require('./likeBook');
const dislikeBook = require('./dislikeBook');
const allBookDetails = require('./getBooksDetails');

// require all the request files and export them in an array
module.exports = [].concat(getReq, postReq, likeBook, dislikeBook, allBookDetails);
