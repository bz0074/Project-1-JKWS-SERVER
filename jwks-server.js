const express = require('express');
const jwt = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

const app = express();
const port = 8080;

// In-memory storage for keys
const keys = [];

// Generate RSA key pair with kid and expiry
function generateKeyPair() {
  const key = new NodeRSA({ b: 2048 });
  key.setOptions({ signingScheme: 'pkcs1-sha256' });

  const publicKey = key.exportKey('pkcs8-public');
  const privateKey = key.exportKey('pkcs8-private');

  const kid = `${keys.length + 1}`;
  key.exp = Math.floor(Date.now() / 1000) + 3600; // Key expires in 1 hour

  keys.push({ kid, publicKey, privateKey, exp: key.exp });
}

// Endpoint for serving JWKS
app.get('/jwks', (req, res) => {
  const validKeys = keys.filter(key => key.exp > Math.floor(Date.now() / 1000));
  const jwks = validKeys.map(key => ({
    kid: key.kid,
    kty: 'RSA',
    use: 'sig',
    alg: 'RS256',
    n: key.publicKey,
    e: 'AQAB', // Default value for RSA public exponent
  }));
  res.json({ keys: jwks });
});

// Endpoint for authentication and issuing JWTs
app.post('/auth', express.json(), (req, res) => {
  const { expired } = req.query;
  const selectedKey = expired ? keys[0] : keys.find(key => key.exp > Math.floor(Date.now() / 1000));

  if (!selectedKey) {
    res.status(500).send('No valid keys available');
    return;
  }

  const payload = { sub: 'fake-user' };
  const jwtToken = jwt.sign(payload, selectedKey.privateKey, { algorithm: 'RS256' });

  res.json({ jwt: jwtToken });
});

// Initialize the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Generate initial key pair
generateKeyPair();

// Schedule key pair generation every 1 hour
setInterval(generateKeyPair, 3600000);
