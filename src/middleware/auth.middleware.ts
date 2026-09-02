import {type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../repositories/user.repository.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('authorization');
  
  const token = authHeader?.split(' ')[1];
if (!token) {
    return res.status(401).json({ error: 'Acces denied. You are not logged in' });
  }
  const isBlacklisted = await isTokenBlacklisted(token);
if (isBlacklisted) {
  return res.status(401).json({ error: 'Acest token a fost invalidat. Te rugam sa te loghezi din nou.' });
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