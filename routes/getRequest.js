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
          list.books.map(eachBook => axios.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${eachBook.id}`)
            .then(response => response.data));
        })
        .then(list => Promise.all(list))
        .then((rateList) => {
          booklist.map((entry, index) => {
            const newEntry = entry;
            newEntry.rating = rateList[index];
            return newEntry;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }];
