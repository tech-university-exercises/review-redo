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
        .then(() => {
          reply({ message: 'Book disliked.', statusCode: 200 });
        })
        .catch(() => {
          reply({ message: 'There was some error.', statusCode: 400 });
        });
    },
  }];
