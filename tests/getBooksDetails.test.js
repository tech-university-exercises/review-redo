const Server = require('../server');

describe('Server test', () => {
  test('responds with success statusCode for upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/books/group',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('responds with a response for a upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/books/group',
    };
    Server.inject(options, (response) => {
      expect(typeof response.result).toEqual('object');
      done();
    });
  });
});
