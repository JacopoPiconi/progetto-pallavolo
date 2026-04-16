import gestore_connessioni from './db.js';
import axios from 'axios';
import * as elo from './elo_calcolatore.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fase 2: Importazione Risultati, Statistiche e Aggiornamento Elo
async function importaRisultatiEUpdateElo(idStagione, apiKey) {
    try {
        // PAUSA TATTICA 1: Aspettiamo 2 secondi per non accavallarci con le altre chiamate
        await sleep(2000); 
        
        const url = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${idStagione}/summaries.json?api_key=${apiKey}`;
        const risp = await axios.get(url);
        
        if (!risp.data.summaries) return;

        let contatorePartite = 0;

        for (const m of risp.data.summaries) {
            // Elaboriamo solo i match chiusi (terminati)
            if (m.sport_event_status.status === 'closed') {
                const casa = m.sport_event.competitors[0].name;
                const trasferta = m.sport_event.competitors[1].name;
                const scoreCasa = m.sport_event_status.home_score;
                const scoreTrasferta = m.sport_event_status.away_score;
                const vintoCasa = scoreCasa > scoreTrasferta ? 1 : 0;
                const dataMatch = m.sport_event.start_time;

                // 1. Cerchiamo le squadre nel DB
                const [rA] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [casa]);
                const [rB] = await gestore_connessioni.query("SELECT id_squadra, punteggio_rating FROM squadre WHERE nome_squadra = ?", [trasferta]);
                
                if (rA.length > 0 && rB.length > 0) {
                    const idA = rA[0].id_squadra;
                    const idB = rB[0].id_squadra;
                    const risultatoSet = `${scoreCasa}-${scoreTrasferta}`;

                    // Controlliamo che la partita non sia già stata salvata
                    const [esiste] = await gestore_connessioni.query("SELECT id_partita FROM partite WHERE id_squadra_casa = ? AND data_partita = ?", [idA, dataMatch]);

                    if (esiste.length === 0) {
                        // 2. SALVATAGGIO PARTITA 
                        const [resInsert] = await gestore_connessioni.query(
                            "INSERT INTO partite (id_squadra_casa, id_squadra_trasferta, data_partita, risultato_set, stato) VALUES (?, ?, ?, ?, 'completata')",
                            [idA, idB, dataMatch, risultatoSet]
                        );
                        const idPartita = resInsert.insertId;

                        // 3. SALVATAGGIO STATISTICHE BASE (Ignora se la tabella non è pronta)
                        try {
                            await gestore_connessioni.query(
                                "INSERT IGNORE INTO statistiche_partite (id_partita, id_squadra, set_vinti) VALUES (?, ?, ?), (?, ?, ?)",
                                [idPartita, idA, scoreCasa, idPartita, idB, scoreTrasferta]
                            );
                        } catch (eStat) { /* ignora errori statistiche */ }

                        // 4. CALCOLO ELO E AGGIORNAMENTO STORICO
                        const nuovi = elo.aggiornaRating(rA[0].punteggio_rating, rB[0].punteggio_rating, vintoCasa);
                        
                        await gestore_connessioni.query("UPDATE squadre SET punteggio_rating = ? WHERE id_squadra = ?", [nuovi.nuovoA, idA]);
                        await gestore_connessioni.query("UPDATE squadre SET punteggio_rating = ? WHERE id_squadra = ?", [nuovi.nuovoB, idB]);

                        // Nuova riga: inserimento nello Storico Rating!
                        await gestore_connessioni.query("INSERT INTO storico_rating (id_squadra, punteggio_elo) VALUES (?, ?)", [idA, nuovi.nuovoA]);
                        await gestore_connessioni.query("INSERT INTO storico_rating (id_squadra, punteggio_elo) VALUES (?, ?)", [idB, nuovi.nuovoB]);

                        contatorePartite++;
                    }
                }
            }
        }
        console.log(`  -> ✅ FASE 2: Inserite ${contatorePartite} partite, statistiche aggiornate ed Elo ricalcolato.`);
    } catch (e) {
        console.error(`  -> ❌ Errore Fase 2 (Risultati): ${e.message}`);
    }
}

export { importaRisultatiEUpdateElo };