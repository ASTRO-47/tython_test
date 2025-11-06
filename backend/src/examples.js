import { query } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (email, password) => {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

  
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user: { 
      id: user.id, 
      email: user.email, 
      username: user.username, 
      role: user.role 
    }};
  } catch (error) {
    throw error;
  }
};

export const getTickets = async (userId, isAdmin) => {
  try {
    const text = isAdmin
      ? 'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id'
      : 'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id WHERE t.user_id = $1';
    
    const values = isAdmin ? [] : [userId];
    const result = await query(text, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};