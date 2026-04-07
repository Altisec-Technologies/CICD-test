const request = require('supertest');
const app = require('../app');

test('GET / should return Hello message', async () => {
  const res = await request(app).get('/');
  expect(res.text).toBe('Hello, CI/CD World!');
});