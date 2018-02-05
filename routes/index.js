const getReq = require('./getBooksAndRating');
const postReq = require('./getBooks');

// require all the request files and export them in an array
module.exports = [].concat(getReq, postReq);
