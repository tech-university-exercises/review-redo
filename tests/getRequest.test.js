const Server = require('../server');

// const output = require('./index.html');

describe('Server test', () => {
  test('responds with success statusCode', (done) => {
    const options = {
      method: 'GET',
      url: '/api1',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
