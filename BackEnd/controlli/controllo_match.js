import db from '../db.js';

export const predictMatch = async (req, res) => {
  const { id_squadra_A, id_squadra_B } = req.body;
  const id_utente_test = 1; // ID utente di default per i test

  if (!id_squadra_A || !id_squadra_B || id_squadra_A === id_squadra_B) {
    return res.status(400).json({ error: "Seleziona due squadre diverse." });
  }

  try {
    // 1. Recupero dati squadre (usando 'nome_squadra' e 'punteggio_rating' dalle tue foto)
    const [teams] = await db.query(
      'SELECT id_squadra, nome_squadra, punteggio_rating FROM squadre WHERE id_squadra IN (?, ?)',
      [id_squadra_A, id_squadra_B]
    );

    if (teams.length !== 2) {
      return res.status(404).json({ error: 'Squadre non trovate.' });
    }

    const teamA = teams.find(t => t.id_squadra === parseInt(id_squadra_A));
    const teamB = teams.find(t => t.id_squadra === parseInt(id_squadra_B));

    // 2. Algoritmo ELO per la probabilità
    const probA = 1 / (1 + Math.pow(10, (teamB.punteggio_rating - teamA.punteggio_rating) / 400));
    const probA_perc = Math.round(probA * 100);

    // Stima del punteggio
    let score = "3 - 2";
    if (probA_perc >= 75) score = "3 - 0";
    else if (probA_perc >= 60) score = "3 - 1";
    else if (probA_perc <= 25) score = "0 - 3";
    else if (probA_perc <= 40) score = "1 - 3";

    // 3. Controllo se esiste una partita reale nel calendario per salvare il pronostico
    const [match] = await db.query(
      `SELECT id_partita FROM partite 
       WHERE (id_squadra_casa = ? AND id_squadra_trasferta = ?) 
       OR (id_squadra_casa = ? AND id_squadra_trasferta = ?) LIMIT 1`,
      [id_squadra_A, id_squadra_B, id_squadra_B, id_squadra_A]
    );

    let salvato = false;
    if (match.length > 0) {
      const vincitore = probA_perc > 50 ? teamA.id_squadra : teamB.id_squadra;
      const prob_vincitore = probA_perc > 50 ? probA_perc : (100 - probA_perc);

      // Inserimento nella tabella pronostici (colonne: id_utente, id_partita, vincitore_predetto, probabilita_vittoria)
      await db.query(
        'INSERT INTO pronostici (id_utente, id_partita, vincitore_predetto, probabilita_vittoria) VALUES (?, ?, ?, ?)',
        [id_utente_test, match[0].id_partita, vincitore, prob_vincitore]
      );
      salvato = true;
    }

    res.status(200).json({
      probabilita_A: probA_perc,
      probabilita_B: 100 - probA_perc,
      risultato_stimato: score,
      match_trovato_e_salvato: salvato
    });

  } catch (error) {
    console.error("Errore Match Predictor:", error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};