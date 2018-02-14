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
        .then(listWithRating => Models.BookL.upsert({
          bookid: listWithRating.id,
          author: listWithRating.Author,
          name: listWithRating.Name,
          rating: listWithRating.rating,
        }))
        .then((result) => {
          if (result) { reply({ statusCode: '201', message: 'Details entered' }); } else {
            reply({ statusCode: '201', message: 'No new entry made' });
          }
        })
        .catch((error) => {
          console.log(error);
          reply(false);
        });
    },
  }];
