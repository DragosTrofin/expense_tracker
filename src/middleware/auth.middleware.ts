import {type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('authorization');
  
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acces denied. You are not logged in' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'secret-temporar';
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired session. Please log in again.' });
  }
};