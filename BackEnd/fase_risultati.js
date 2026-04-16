const gestore_connessioni = require('./db');
const axios = require('axios');
const elo = require('./elo_calcolatore');
// Fase 2: Importazione Risultati e Aggiornamento Elo
async function importaRisultatiEUpdateElo(idStagione, apiKey) {
    try {
        const url = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${idStagione}/summaries.json?api_key=${apiKey}`;
        const risp = await axios.get(url);
        
        if (!risp.data.summaries) return;

        for (const m of risp.data.summaries) {
            // Elaboriamo solo i match chiusi (terminati)
            if (m.sport_event_status.status === 'closed') {
                const casa = m.sport_event.competitors[0].name;
                const trasferta = m.sport_event.competitors[1].name;
                const scoreCasa = m.sport_event_status.home_score;
                const scoreTrasferta = m.sport_event_status.away_score;
                const vintoCasa = scoreCasa > scoreTrasferta ? 1 : 0;
                const dataMatch = m.sport_event.start_time;
                // 1. Cerchiamo le squadre nel DB per ID e Rating attuale
                const [rA] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [casa]);
                const [rB] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [trasferta]);
                if (rA.length > 0 && rB.length > 0) {
                    const idA = rA[0].id_squadra;
                    const idB = rB[0].id_squadra;

                    // 2. Calcolo e aggiornamento Rating Elo
                    const nuovi = elo.aggiornaRating(rA[0].punteggio_rating, rB[0].punteggio_rating, vintoCasa);
                    await gestore_connessioni.query("UPDATE squadre SET punteggio_rating = ? WHERE id_squadra = ?", [nuovi.nuovoA, idA]);
                    await gestore_connessioni.query("UPDATE squadre SET punteggio_rating = ? WHERE id_squadra = ?", [nuovi.nuovoB, idB]);

                    // 3. SALVATAGGIO PARTITA NEL DATABASE (Novità)
                    const risultatoSet = `${scoreCasa}-${scoreTrasferta}`;
                    await gestore_connessioni.query(
                        "INSERT IGNORE INTO partite (id_squadra_casa, id_squadra_trasferta, data_partita, risultato_set, stato) VALUES (?, ?, ?, ?, 'completata')",
                        [idA, idB, dataMatch, risultatoSet]
                    );
                    
                    console.log(` Risultato Salvato: ${casa} ${risultatoSet} ${trasferta}`);
                }
            }
        }
    } catch (e) {
        throw new Error(`Errore Fase 2: ${e.message}`);
    }
}

module.exports = { importaRisultatiEUpdateElo };