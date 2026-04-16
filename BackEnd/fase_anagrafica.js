import gestore_connessioni from './db.js';
import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Normalizzatore integrato
function normalizzaSquadra(datiSportradar) {
    return {
        nome: datiSportradar.name || "Sconosciuta",
        id_esterno: datiSportradar.id
    };
}
// Fase 1: Importazione Anagrafica Mondiale con Sistema di Cache
async function importaAnagraficaMondiale(apiKey) {
    try {
        const urlLeghe = `https://api.sportradar.com/volleyball/trial/v2/en/competitions.json?api_key=${apiKey}`;
        const rispLeghe =await axios.get(urlLeghe);
        
        const nazioniTop = ['Italy', 'Poland']; 
        const legheScelte= rispLeghe.data.competitions.filter(l => nazioniTop.includes(l.category.name));
        for (const lega of legheScelte) {
            console.log(`Elaborazione Lega Anagrafica: ${lega.name}`);
            await gestore_connessioni.query("INSERT IGNORE INTO leghe (nome_lega, nazione) VALUES (?, ?)", [lega.name, lega.category.name]);
            const [rowsLega] = await gestore_connessioni.query("SELECT id_lega FROM leghe WHERE nome_lega = ?", [lega.name]);
            const idLegaDB = rowsLega[0].id_lega;
            
            await sleep(1500);

            const urlStagioni = `https://api.sportradar.com/volleyball/trial/v2/en/competitions/${lega.id}/seasons.json?api_key=${apiKey}`;
            const rispStag = await axios.get(urlStagioni);

            if (rispStag.data.seasons && rispStag.data.seasons.length > 0) {
                const stagioneId = rispStag.data.seasons[0].id;
                await sleep(1500);

                const urlSquadre = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${stagioneId}/competitors.json?api_key=${apiKey}`;
                const rispSq = await axios.get(urlSquadre);

                if (rispSq.data.season_competitors) {
                    for (const sqRaw of rispSq.data.season_competitors) {
                        const sq = normalizzaSquadra(sqRaw); // Normalizziamo i dati

                        // LOGICA DI CACHE: Controlliamo se esiste prima di inserire e scaricare
                        const [esiste] = await gestore_connessioni.query("SELECT id_squadra FROM squadre WHERE id_sportradar = ?", [sq.id_esterno]);
                        
                        if (esiste.length === 0) {
                            console.log(`Inserimento nuova squadra: ${sq.nome}`);
                            await gestore_connessioni.query(
                                "INSERT INTO squadre (nome_squadra, punteggio_rating, id_lega, id_sportradar) VALUES (?, 1500, ?, ?)",
                                [sq.nome, idLegaDB, sq.id_esterno]
                            );
                            
                            const [rowSq] = await gestore_connessioni.query("SELECT id_squadra FROM squadre WHERE id_sportradar = ?", [sq.id_esterno]);
                            const idSquadraDB = rowSq[0].id_squadra;
                            await gestore_connessioni.query("INSERT IGNORE INTO storico_rating (id_squadra, punteggio_elo) VALUES (?, 1500)", [idSquadraDB]);
                            
                            await sleep(1500); // Pausa per i Roster
                            try {
                                const urlRoster = `https://api.sportradar.com/volleyball/trial/v2/en/competitors/${sq.id_esterno}/profile.json?api_key=${apiKey}`;
                                const rispRoster =await axios.get(urlRoster);
                                if (rispRoster.data.players) {
                                    for (const p of rispRoster.data.players) {
                                        await gestore_connessioni.query(
                                            "INSERT IGNORE INTO giocatori (nome, cognome, ruolo_campo, id_squadra) VALUES (?, ?, ?, ?)",
                                            [p.name, '', p.type || 'N/D', idSquadraDB]
                                        );
                                    }
                                }
                            } catch (e) { /* Ignora errori Roster per non bloccare la pipeline */ }
                        } else {
                            // Se la squadra c'è già, NON facciamo la chiamata per il roster
                            console.log(`⏭Cache hit: ${sq.nome} già presente. Salto API.`);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error("Errore Fase 1 (Anagrafica):", err.message);
        throw err; // Necessario per avvisare il main_pipeline
    }
}

export { importaAnagraficaMondiale };