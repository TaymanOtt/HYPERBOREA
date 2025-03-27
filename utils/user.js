// models/user.js
const pool = require('pg');
const bcrypt = require('bcrypt');

const User = {
  async findByEmail(email) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1', 
        [email]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  },

  async findById(id) {
    try {
      const { rows } = await pool.query(
        'SELECT id, email FROM users WHERE id = $1', 
        [id]
      );
      return rows[0] || null;
    } catch (err) {
      throw err;
    }
  },

  async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = User;