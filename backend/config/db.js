import mysql from 'mysql2/promise';
const pool = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_ciudadpais'
});
export default pool;