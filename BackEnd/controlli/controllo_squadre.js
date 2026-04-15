import db from '../db.js';

export const getAllSquadre = async (req, res) => {
  try {
    const [squadre] = await db.query('SELECT * FROM squadre');
    res.status(200).json(squadre);
  } catch (error) {
    console.error("Errore recupero squadre:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};