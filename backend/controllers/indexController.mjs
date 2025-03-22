import db from '../db/index.mjs';

export const home = (req, res) => {
  res.json({ message: 'Welcome to Express.js with ES6 Modules and PostgreSQL' });
};

export const getUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
