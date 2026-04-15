import db from '../db.js';

export const getAllGiocatori = async (req, res) => {
  try {
    const [giocatori] = await db.query('SELECT * FROM giocatori');
    res.status(200).json(giocatori);
  } catch (error) {
    console.error("Errore durante il recupero dei giocatori:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};