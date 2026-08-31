import { z } from 'zod';

export const expenseSchema = z.object({
  amount: z.number({ message: "Suma este obligatorie și trebuie sa fie un numar valid." })
    .positive("Suma trebuie sa fie mai mare decat 0."),
  
  category: z.string({ message: "Categoria este obligatorie si trebuie sa fie text." })
    .min(2, "Categoria trebuie sa aiba minim 2 caractere."),
  
  date: z.string({ message: "Data este obligatorie." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data trebuie sa fie in formatul YYYY-MM-DD (ex: 2026-08-28)."),
  
  note: z.string({ message: "Nota este obligatorie." })
    .min(3, "Nota trebuie sa aiba măcar 3 caractere.")
});