const assert = require('assert');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path'); // Add this line

describe('Key Generation', () => {
  it('should generate private and public keys', () => {
    // Run key generation script
    execSync('node ../keyGen.js'); // Adjust the path to keyGen.js

    // Check if files are created
    assert.ok(fs.existsSync(path.resolve(__dirname, '..', 'private-key.pem')));
    assert.ok(fs.existsSync(path.resolve(__dirname, '..', 'public-key.pem')));
  });
});
