import { type Request, type  Response, type NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateData = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        return res.status(400).json({ errors: errorMessages });
      }
      
      return res.status(400).json({ error: 'Date invalide trimise catre server.' });
    }
  };
};