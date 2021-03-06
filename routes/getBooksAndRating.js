const rp = require('request-promise');

module.exports = [
  {
    method: 'GET',
    path: '/api1',
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
        .then(listWithRating => listWithRating.reduce((result, item) => {
          if (!result[item.Author]) {
            result[item.Author] = new Array(item);
          } else {
            result[item.Author].push(item);
          }
          return result;
        }, {}))
        .then((result) => {
          reply(result);
        })
        .catch((error) => {
          console.log(error);
          reply(false);
        });
    },
  }];
