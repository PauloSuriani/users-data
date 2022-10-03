import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { executeQueries } from './queryUtils';
dotenv.config();

const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

/* c8 ignore start */
if (!process.env.TESTING) {
  executeQueries(conn);
}
/* c8 ignore end */
export default conn;