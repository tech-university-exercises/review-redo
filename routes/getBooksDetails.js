const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/books/group',
    handler: (request, response) => {
      // console.log(request);
      // console.log('abcd');
      let allBook = [];
      Models.booklist.findAll().then((result) => {
        result.forEach((book) => {
          allBook = allBook.concat({
            bookid: book.bookid,
            author: book.author,
            name: book.name,
            rating: book.rating,
            like: book.liked,
          });
        });
      }).then(() => allBook.reduce((result, item) => {
        if (!result[item.author]) {
          result[item.author] = new Array(item);
        } else {
          result[item.author].push(item);
        }
        return result;
      }, {})).then(groupedList => response(groupedList));
    },
  }];
