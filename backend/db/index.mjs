import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'your_pg_username',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_pg_password',
  port: 5432,
});

export default {
  query: (text, params) => pool.query(text, params),
};
