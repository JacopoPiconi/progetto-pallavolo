import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;const mysql = require('mysql2/promise');
require('dotenv').config(); // 1. Questo comando legge il file .env

const server_database = process.env.DB_HOST;
const utente_database = process.env.DB_USER;
const password_database = process.env.DB_PASSWORD;
const nome_database = process.env.DB_NAME;
const porta_database = process.env.DB_PORT;
// Creazione del pool di connessioni al database MySQL
const gestore_connessioni = mysql.createPool({
    host: server_database,
    user: utente_database,
    password: password_database,
    database: nome_database,
    port: porta_database,
    
    // gestione contemporanea piu utenti
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
    
// Esportiamo il gestore per poterlo usare nel file server.js
module.exports = gestore_connessioni;