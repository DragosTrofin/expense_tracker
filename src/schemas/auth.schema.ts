import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Adresa de email nu este valida.'),
  password: z.string().min(6, 'Parola trebuie sa contina cel putin 6 caractere.')
});