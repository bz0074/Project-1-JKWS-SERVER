const express = require('express');
const jwt = require('jsonwebtoken');
const { generateKeyPair } = require('./keygen');

const app = express();
const PORT = 8080;

const keys = [];

app.get('/jwks', (req, res) => {
  const now = Date.now();
  const validKeys = keys.filter((key) => key.expiry > now);
  const jwks = validKeys.map((key) => ({
    kid: key.kid,
    kty: 'RSA',
    use: 'sig',
    alg: 'RS256',
    n: key.publicKey.split('-----')[2].replace(/\n/g, ''),
    e: 'AQAB',
  }));

  res.json({ keys: jwks });
});

app.post('/auth', (req, res) => {
  const expired = req.query.expired === 'true';
  const selectedKey = expired ? keys.find((key) => key.expiry <= Date.now()) : keys.find((key) => key.expiry > Date.now());

  if (!selectedKey) {
    return res.status(500).json({ error: 'No valid keys available' });
  }

  const payload = { sub: 'fakeuser' };
  const token = jwt.sign(payload, selectedKey.privateKey, { algorithm: 'RS256', keyid: selectedKey.kid });

  res.json({ token });
});

// Initialize keys
for (let i = 0; i < 3; i++) {
  keys.push(generateKeyPair());
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
