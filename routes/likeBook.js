const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/book/like/{$bookid}',
    handler: (request, reply) => {
      Models.booklist.update({
        liked: 'true',
      }, {
        where: {
          bookid: request.params.bookid,
        },
      })
        .then(() => {
          reply({ message: 'Book liked.', statusCode: 200 });
        })
        .catch(() => {
          reply({ message: 'There was some error.', statusCode: 400 });
        });
    },
  }];
