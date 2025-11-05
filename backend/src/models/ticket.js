import { query } from '../config/database.js';

export const Ticket = {
  async create({ title, description, user_id }) {
    const result = await query(
      'INSERT INTO tickets (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, user_id]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await query(
      'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id WHERE t.id = $1',
      [id]
    );
    return result.rows[0];
  },

  async findAll(user_id = null, role = 'user') {
    let result;
    if (role === 'admin' || role === 'support') {
      result = await query(
        'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC'
      );
    } else {
      result = await query(
        'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id WHERE t.user_id = $1 ORDER BY t.created_at DESC',
        [user_id]
      );
    }
    return result.rows;
  },

  async update(id, { title, description, status }, user_id, role) {
    let result;
    if (role === 'admin') {
      result = await query(
        'UPDATE tickets SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status) WHERE id = $4 RETURNING *',
        [title, description, status, id]
      );
    } else if (role === 'support') {
      result = await query(
        'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
    } else {
      result = await query(
        'UPDATE tickets SET title = COALESCE($1, title), description = COALESCE($2, description) WHERE id = $3 AND user_id = $4 AND status = \'open\' RETURNING *',
        [title, description, id, user_id]
      );
    }
    return result.rows[0];
  },

  async delete(id) {
    await query('DELETE FROM tickets WHERE id = $1', [id]);
  }
};