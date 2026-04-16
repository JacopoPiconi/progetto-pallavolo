import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import giocatoriRoutes from './routes/giocatori.js';
import classificheRoutes from './routes/classifiche.js';
import partiteRoutes from './routes/partite.js';
import squadreRoutes from './routes/squadre.js';

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
app.use('/api/classifiche', classificheRoutes);
app.use('/api/partite', partiteRoutes);
app.use('/api/squadre', squadreRoutes);

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});