const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 8080;

// Load keys
const privateKey = fs.readFileSync('private-key.pem', 'utf-8');
const publicKey = fs.readFileSync('public-key.pem', 'utf-8');

// RESTful JWKS endpoint
app.get('/jwks', (req, res) => {
  // Implement the JWKS endpoint logic here
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
  // Implement the authentication endpoint logic here
  const user = {
    id: 1,
    username: 'fakeuser',
  };

 const token = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '1h', keyid: 'kid' });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
