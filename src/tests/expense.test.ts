import request from 'supertest';
import app from '../app.js';
import {describe, it, expect, beforeAll} from 'vitest';

const testUser = {
  email: `expense_tester_${Date.now()}@example.com`,
  password: 'Password123!'
};

let authToken = '';

describe('CRUD Flow Tests - Expenses', () => {
  beforeAll(async () => {
    await request(app).post('/auth/register').send(testUser);
    const loginRes = await request(app).post('/auth/login').send(testUser);
    authToken = loginRes.body.token;
  }, 90000);

  it('ar trebui sa creeze o cheltuiala noua', async () => {
    const newExpense = {
      amount: 300.00,
      category: 'Utilitati',
      date: '2026-08-31',
      note: 'Test automatizare'
    };

    const response = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newExpense);

        expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('expense');
    expect(response.body.expense).toHaveProperty('id');
    expect(response.body.expense.amount).toBe(300.00);
  }, 60000);

  it('ar trebui sa citeasca lista de cheltuieli', async () => {
    const response = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('expenses');
    expect(Array.isArray(response.body.expenses)).toBe(true);
    expect(response.body.expenses.length).toBeGreaterThan(0);
  }, 60000);
});