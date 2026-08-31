import request from 'supertest';
import app from '../app.js';
import {describe, it, expect} from 'vitest';

const testUser = {
  email: `tester_${Date.now()}@example.com`,
  password: 'Password123!' 
};

describe('Auth Flow Tests', () => {
  it('ar trebui sa inregistreze un utilizator nou', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  }, 60000);

  it('ar trebui sa logheze utilizatorul si sa returneze un token JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  }, 60000);

  it('ar trebui sa returneze eroare 400 pentru credentiale gresite', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'WrongPassword!' });

    expect(response.status).toBe(400);
  }, 60000);
});
