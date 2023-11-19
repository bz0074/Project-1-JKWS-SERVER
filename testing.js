const supertest = require('supertest');
const app = require('./server');

const request = supertest(app);

describe('GET /jwks', () => {
  it('should return a list of valid keys', async () => {
    const response = await request.get('/jwks');
    expect(response.status).toBe(200);
    expect(response.body.keys.length).toBeGreaterThan(0);
  });
});

describe('POST /auth', () => {
  it('should return a valid JWT', async () => {
    const response = await request.post('/auth');
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return a JWT with an expired key if "expired" query parameter is present', async () => {
    const response = await request.post('/auth?expired=true');
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
