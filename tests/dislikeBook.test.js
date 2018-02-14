const Server = require('../server');

describe('Server for valid bookid test', () => {
  test('responds with success statusCode for upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/book/dislike/10',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  });
  test('responds with message for upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/book/dislike/10',
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toBe('Book disliked.');
      done();
    });
  });
});
