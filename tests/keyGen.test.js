
const assert = require('assert');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Key Generation', () => {
  it('should generate private and public keys', () => {
    // Run key generation script
    execSync('node ../keyGen.js', { cwd: path.join(__dirname, '..') });

    // Check if files are created
    assert.ok(fs.existsSync('private-key.pem'));
    assert.ok(fs.existsSync('public-key.pem'));
  });
});

