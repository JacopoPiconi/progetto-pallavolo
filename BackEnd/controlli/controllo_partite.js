import db from '../db.js';

export const getAllPartite = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_partita, 
        p.data_partita, 
        p.stato, 
        p.risultato_set,
        sc.nome_squadra AS squadra_casa, 
        st.nome_squadra AS squadra_trasferta
      FROM partite p
      JOIN squadre sc ON p.id_squadra_casa = sc.id_squadra
      JOIN squadre st ON p.id_squadra_trasferta = st.id_squadra
      ORDER BY p.data_partita DESC
    `;

    const [partite] = await db.query(query);
    res.status(200).json(partite);
  } catch (error) {
    // Stampiamo l'errore specifico nel terminale per il debugging
    console.error("Errore durante il recupero delle partite:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};