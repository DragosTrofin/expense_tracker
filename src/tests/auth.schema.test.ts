import { describe, it, expect } from 'vitest';
import { authSchema } from '../schemas/auth.schema.js'; 

describe('Unit Tests - Auth Validation Schema', () => {
  it('ar trebui sa valideze cu succes datele corecte', () => {
    const validData = {
      email: 'user@example.com',
      password: 'Password123!'
    };

    const result = authSchema.safeParse(validData);

    expect(result.success).toBe(true);
  });

  it('ar trebui sa respinga o parola mai scurta de 6 caractere', () => {
    const invalidData = {
      email: 'user@example.com',
      password: '123'
    };

    const result = authSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    
    if (!result.success) {
      expect(result.error?.issues?.[0]?.message).toBe('Parola trebuie sa contina cel putin 6 caractere.');
    }
  });
});