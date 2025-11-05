import { query } from '../config/database.js';
import bcrypt from 'bcrypt';

export const User = {
  async create({ username, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, hashedPassword, role]
    );
    return result.rows[0];
  },

  async findByUsername(username) {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findById(id) {
    const result = await query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async getAll() {
    const result = await query('SELECT id, username, email, role, created_at FROM users');
    return result.rows;
  },

  async update(id, { role }) {
    const result = await query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role',
      [role, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await query('DELETE FROM users WHERE id = $1', [id]);
  },

  async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
};