import db from '../db.js';

export const getClassifiche = async (req, res) => {
  try {
    const query = `
      SELECT 
        l.id_lega,
        l.nome_lega, 
        l.nazione,
        s.id_squadra,
        s.nome_squadra, 
        s.punteggio_rating
      FROM leghe l
      JOIN squadre s ON l.id_lega = s.id_lega
      ORDER BY l.id_lega ASC, s.punteggio_rating DESC
    `;
    
    const [classifiche] = await db.query(query);
    res.status(200).json(classifiche);
  } catch (error) {
    console.error("Errore durante il recupero delle classifiche:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};