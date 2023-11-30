const assert = require('assert');
const { execSync } = require('child_process');

describe('Test Client', () => {
  it('should run the test client without errors', () => {
    try {
      execSync('node testClient.js');
    } catch (error) {
      assert.fail('Test client execution failed');
    }
  });
});
