import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 19;


export const registerUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email-ul este deja folosit.');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await createUser(email, hashedPassword);

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Email-ul sau parola sunt incorecte.');
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Email-ul sau parola sunt incorecte.');
  }
const secretKey = process.env.JWT_SECRET || 'secret-de-rezerva-temporar';

const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '24h' });

return {user:{id: user.id, email: user.email, created_at: user.created_at}, token};
}