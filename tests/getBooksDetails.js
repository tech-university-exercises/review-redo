const Server = require('../server');

describe('Server test', () => {
  test('responds with success statusCode for upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/books/group',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe('200');
      done();
    });
  });
});
