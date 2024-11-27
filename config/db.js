const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err);
      return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso');
    connection.release();
});

module.exports = pool.promise();
