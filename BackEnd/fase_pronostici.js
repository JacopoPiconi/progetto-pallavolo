import gestore_connessioni from './db.js';
import axios from 'axios';
import * as elo from './elo_calcolatore.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fase 3: Generazione Pronostici Futuri
async function generaPronosticiFuturi(idStagione, apiKey) {
    try {
        // PAUSA TATTICA LUNGA: Aspettiamo 5 secondi per far scaricare la Fase 2 in santa pace
        await sleep(5000);

        const url = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${idStagione}/summaries.json?api_key=${apiKey}`;
        const risp = await axios.get(url);
        
        if (!risp.data.summaries) return;

        let contatorePronostici = 0;

        for (const m of risp.data.summaries) {
            // Elaboriamo i match non ancora iniziati (Sportradar usa anche "scheduled")
            if (m.sport_event_status.status === 'not_started' || m.sport_event_status.status === 'scheduled') {
                const casa = m.sport_event.competitors[0].name;
                const trasferta = m.sport_event.competitors[1].name;
                const dataMatch = m.sport_event.start_time;
                
                const [rA] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [casa]);
                const [rB] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [trasferta]);
                
                if (rA.length > 0 && rB.length > 0) {
                    const idA = rA[0].id_squadra;
                    const idB = rB[0].id_squadra;

                    // 1. Calcolo Probabilità
                    const probCasa = elo.calcolaProbabilitaAttesa(rA[0].punteggio_rating, rB[0].punteggio_rating);
                    const percentuale = Math.round(probCasa * 100); 

                    // 2. SALVATAGGIO PRONOSTICO (Usiamo IGNORE per non creare duplicati se lo lanci 2 volte)
                    await gestore_connessioni.query(
                        "INSERT IGNORE INTO pronostici (squadra_1, squadra_2, prob_vittoria, data_match) VALUES (?, ?, ?, ?)",
                        [idA, idB, percentuale, dataMatch]
                    );

                    contatorePronostici++;
                }
            }
        }
        console.log(`  -> ✅ FASE 3: Calcolati e salvati ${contatorePronostici} pronostici per le partite future.`);
    } catch (e) {
        console.error(`  -> ❌ Errore Fase 3 (Pronostici): ${e.message}`);
    }
}

export { generaPronosticiFuturi };