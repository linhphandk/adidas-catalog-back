import {Pool} from 'pg';
const pool = new Pool({
  user: 'postgres',
  host: process.env.NODE_ENV === 'test'? '127.0.0.1': 'catalog-db',
  database: 'catalog',
  password: 'postgres',
  port: 5432,
});


export default pool;
