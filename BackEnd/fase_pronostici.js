const gestore_connessioni = require('./db');
const axios = require('axios');
const elo = require('./elo_calcolatore');
// Fase 3: Generazione Pronostici Futuri
async function generaPronosticiFuturi(idStagione, apiKey) {
    try {
        const url = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${idStagione}/summaries.json?api_key=${apiKey}`;
        const risp = await axios.get(url);
        if (!risp.data.summaries) return;
        for (const m of risp.data.summaries) {
            // Elaboriamo solo i match non ancora iniziati
            if (m.sport_event_status.status === 'not_started') {
                const casa = m.sport_event.competitors[0].name;
                const trasferta = m.sport_event.competitors[1].name;
                const dataMatch = m.sport_event.start_time;
                const [rA] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [casa]);
                const [rB] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [trasferta]);
                
                if (rA.length > 0 && rB.length > 0) {// Se entrambe le squadre sono presenti nel DB
                    const idA = rA[0].id_squadra;
                    const idB = rB[0].id_squadra;

                    // 1. Calcolo Probabilità
                    const probCasa = elo.calcolaProbabilitaAttesa(rA[0].punteggio_rating, rB[0].punteggio_rating);
                    const percentuale = Math.round(probCasa * 100); 

                    // 2. SALVATAGGIO PRONOSTICO NEL DATABASE (Novità)
                    // Assicurati che i nomi delle colonne coincidano con il tuo schema SQL
                    await gestore_connessioni.query(
                        "INSERT IGNORE INTO pronostici (squadra_1, squadra_2, prob_vittoria, data_match) VALUES (?, ?, ?, ?)",
                        [idA, idB, percentuale, dataMatch]
                    );

                    console.log(`Pronostico Salvato: ${casa} vs ${trasferta} (${percentuale}% vittoria casa)`);
                }
            }
        }
    } catch (e) {
        throw new Error(`Errore Fase 3: ${e.message}`);
    }
}
module.exports = { generaPronosticiFuturi };