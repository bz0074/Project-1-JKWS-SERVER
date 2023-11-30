const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  const kid = crypto.randomBytes(8).toString('hex');
  const expiry = Date.now() + 86400000; // 24 hours in milliseconds

  return { kid, publicKey, privateKey, expiry };
}

module.exports = { generateKeyPair };
