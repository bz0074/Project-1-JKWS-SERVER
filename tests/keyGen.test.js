const assert = require('assert');
const { execSync } = require('child_process');
const fs = require('fs');

describe('Key Generation', () => {
  it('should generate private and public keys', () => {
    // Run key generation script
    execSync('node keyGen.js');

    // Check if files are created
    assert.ok(fs.existsSync('private-key.pem'));
    assert.ok(fs.existsSync('public-key.pem'));
  });
});
