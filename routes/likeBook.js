const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/book/like/{bookid}',
    handler: (request, reply) => {
      Models.booklist.update({
        liked: 'true',
      }, {
        where: {
          bookid: request.params.bookid,
        },
      })
        .then((result) => {
          if (result[0] === 1) { reply({ message: 'Book liked.', statusCode: 200 }); } else { reply({ message: 'Bookid doesnot exit.', statusCode: 404 }); }
        })
        .catch(() => {
          reply({ message: 'There was some error.', statusCode: 500 });
        });
    },
  }];
