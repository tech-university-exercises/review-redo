const Server = require('../server');

describe('Server test', () => {
  test('responds with success statusCode for upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/api2',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe('200');
      done();
    });
  });

  test('responds with a response for a upsert', (done) => {
    const options = {
      method: 'GET',
      url: '/api2',
    };
    Server.inject(options, (response) => {
      expect(response.result.message).toEqual('Inserted or no change');
      done();
    });
  });
});
