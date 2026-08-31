import { type Request, type Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service.js';
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email-ul si parola sunt obligatorii.' });
    }
    const user = await registerUser(email, password);

    return res.status(201).json({
      message: 'Utilizatorul a fost inregistrat cu succes!',
      user: user 
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email-ul si parola sunt obligatorii.' });
    }
    const data = await loginUser(email, password);
    
    return res.status(200).json({
      message: 'Login reusit!',
      user: data.user,
      token: data.token
    });
  }
  catch (error: any) {
    return res.status(400).json({ error: error.message });
  } 
};