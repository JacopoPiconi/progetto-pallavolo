import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ATTENZIONE AL NOME DEL FILE AGGIORNATO QUI SOTTO:
import giocatoriRoutes from './routes/giocatori.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Il backend funziona correttamente!' });
});

// Usiamo la rotta
app.use('/api/giocatori', giocatoriRoutes);

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});