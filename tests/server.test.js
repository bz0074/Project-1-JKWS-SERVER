const axios = require('axios');
const assert = require('assert');

describe('Server', () => {
  it('should return a valid JWT', async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth');
      assert.ok(response.data.token);
    } catch (error) {
      assert.fail('Authentication request failed');
    }
  });
});
