const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path'); // Add this line

const app = express();
const port = 8080;

// Load keys with correct path
const privateKeyPath = path.join(__dirname, 'private-key.pem');
const publicKeyPath = path.join(__dirname, 'public-key.pem');
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');

// RESTful JWKS endpoint
app.get('/jwks', (req, res) => {
  const jwks = {
    keys: [
      {
        kty: 'RSA',
        kid: 'your-key-id', // Replace with a unique identifier
        use: 'sig',
        alg: 'RS256',
        n: publicKey.split('\n').slice(1, -2).join(''), // Remove PEM headers and footers
        e: 'AQAB',
      },
    ],
  };

  res.json(jwks);
});

// Authentication endpoint
app.post('/auth', (req, res) => {
  const user = {
    id: 1,
    username: 'fakeuser',
  };

  const token = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '1h', keyid: 'your-key-id' });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
