const rp = require('request-promise');
const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/api2',
    handler: (request, reply) => {
      const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
      let booklist;
      rp.get(url)
        .then((result) => {
          const list = JSON.parse(result);
          booklist = list.books;
          return list.books.map(eachBook => rp.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${eachBook.id}`));
        })
        .then(list => Promise.all(list))
        .then(rateList => booklist.map((entry, index) => {
          const newEntry = entry;
          newEntry.rating = JSON.parse(rateList[index]).rating;
          return newEntry;
        }))
        .then((listWithRating) => {
          listWithRating.forEach((bookEntry) => {
            Models.booklist.upsert({
              id: bookEntry.id,
              bookid: bookEntry.id,
              author: bookEntry.Author,
              name: bookEntry.Name,
              rating: bookEntry.rating,
            });
          });
          return true;
        })
        .then((result) => {
          console.log(result, '****');
          if (result) { reply({ statusCode: '200', message: 'Inserted or no change' }); } else {
            reply({ statusCode: '201', message: 'Roe updated' });
          }
        })
        .catch((error) => {
          console.log(error);
          reply(false);
        });
    },
  }];
