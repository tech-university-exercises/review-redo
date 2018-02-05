const Server = require('../server');

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

  test('responds with resource not found statusCode', (done) => {
    const options = {
      method: 'GET',
      url: '/api11',
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});
