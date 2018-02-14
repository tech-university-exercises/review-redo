const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/book/dislike/{bookid}',
    handler: (request, reply) => {
      Models.booklist.update({
        liked: 'false',
      }, {
        where: {
          bookid: request.params.bookid,
        },
      })
        .then((result) => {
          if (result === 1) { reply({ message: 'Book disliked.', statusCode: 200 }); } else { reply({ message: 'Bookid doesnot exit.', statusCode: 404 }); }
        })
        .catch(() => {
          reply({ message: 'There was some error.', statusCode: 500 });
        });
    },
  }];
