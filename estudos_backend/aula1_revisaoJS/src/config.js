import mysql, { createPool } from 'mysql2';

export const pool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'senai',
	database: 'biblioteca_db'
});
