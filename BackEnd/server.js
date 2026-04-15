import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permette al frontend di fare richieste
app.use(express.json()); // Permette di leggere i dati JSON inviati dal frontend

// Rotta di Test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Il backend funziona correttamente!' });
});

// Esempio: Rotta per prendere tutti i giocatori
app.get('/api/giocatori', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM giocatori');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore del server durante il recupero dei giocatori' });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});