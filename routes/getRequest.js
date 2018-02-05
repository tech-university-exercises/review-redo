const axios = require('axios');

module.exports = [
  {
    method: 'GET',
    path: '/api1',
    handler: (request, reply) => {
      const url = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';
      let booklist;
      axios.get(url)
        .then(response => response.data)
        .then((list) => {
          booklist = list.books;
          return list.books.map(eachBook => axios.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${eachBook.id}`)
            .then(response => response.data));
        })
        .then(list => Promise.all(list))
        .then(rateList => booklist.map((entry, index) => {
          const newEntry = entry;
          newEntry.rating = rateList[index].rating;
          return newEntry;
        }))
        .then(listWithRating => listWithRating.reduce((result, item) => {
          console.log(item.Author);
          if (!result[item.Author]) {
            result[item.Author] = new Array(item);
          } else {
            result[item.Author].push(item);
          }
          return result;
        }, {}))
        .then((result) => {
          console.log(result);
          reply(result);
        })
        .catch((error) => {
          console.log(error);
          reply(false);
        });
    },
  }];
