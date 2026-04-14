require('dotenv').config();
const gestore_connessioni = require('./db');
const axios = require('axios');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));//funzione per avviare la pipeline

async function avviaPipelineSportradarGlobale() {
    console.log("Avvio Data Engineering...");

    try {
        console.log("\n1. Connessione a Sportradar...");
        const urlLeghe = `https://api.sportradar.com/volleyball/trial/v2/en/competitions.json?api_key=${process.env.API_KEY_SPORTRADAR}`;
        const rispLeghe = await axios.get(urlLeghe);
        const nazioniTop = ['Italy', 'Poland', 'Brazil', 'France', 'Turkey', 'Japan', 'International'];
        const legheScelte = rispLeghe.data.competitions.filter(lega => 
            nazioniTop.includes(lega.category.name)
        );
        console.log(`🎯 Trovate ${legheScelte.length} Leghe nel catalogo Sportradar.`);
        for (const [index, lega] of legheScelte.entries()) {
            console.log(`\n📡 [${index + 1}/${legheScelte.length}] Analizzo: ${lega.name} (${lega.category.name})`);
            const [esisteLega] = await gestore_connessioni.query(
                "SELECT id_lega FROM leghe WHERE nome_lega = ?", [lega.name]
            );

            let idLegaDB;
            if (esisteLega.length > 0) {
                idLegaDB = esisteLega[0].id_lega;
            } else {
                const [nuovaLega] = await gestore_connessioni.query(
                    "INSERT INTO leghe (nome_lega, nazione) VALUES (?, ?)", 
                    [lega.name, lega.category.name]
                );
                idLegaDB = nuovaLega.insertId;
                console.log(` Inserita nuova Lega nel DB: ${lega.name}`);
            }

            await sleep(1500); // Pausa per il limite API

            // --- GESTIONE STAGIONI ---
            const urlStagioni = `https://api.sportradar.com/volleyball/trial/v2/en/competitions/${lega.id}/seasons.json?api_key=${process.env.API_KEY_SPORTRADAR}`;
            
            try {
                const rispStagioni = await axios.get(urlStagioni);
                const stagioni = rispStagioni.data.seasons;

                if (stagioni && stagioni.length > 0) {
                    const stagioneAttuale = stagioni[0];
                    await sleep(1500); 

                    // --- GESTIONE SQUADRE ---
                    const urlSquadre = `https://api.sportradar.com/volleyball/trial/v2/en/seasons/${stagioneAttuale.id}/competitors.json?api_key=${process.env.API_KEY_SPORTRADAR}`;
                    const rispSquadre = await axios.get(urlSquadre);

                    if (rispSquadre.data.season_competitors) {
                        const squadreDaInserire = rispSquadre.data.season_competitors;
                        
                        for (const sq of squadreDaInserire) {
                            try {
                                // Inseriamo la squadra collegandola all'idLegaDB corretto
                                const [resSquadra] = await gestore_connessioni.query(
                                    "INSERT IGNORE INTO Squadre (nome_squadra, punteggio_rating, id_lega) VALUES (?, ?, ?)",
                                    [sq.name, 1500, idLegaDB]
                                );

                                // Se è una nuova squadra (non ignorata), aggiungiamo lo storico
                                if (resSquadra.affectedRows > 0) {
                                    await gestore_connessioni.query(
                                        "INSERT INTO Storico_Rating (id_squadra, punteggio_elo) VALUES (?, ?)",
                                        [resSquadra.insertId, 1500]
                                    );
                                }
                            } catch (e) { /* Ignora errori singoli */ }
                        }
                        console.log(`   -> ✔️ Elaborate ${squadreDaInserire.length} squadre per questa lega.`);
                    }
                }
            } catch (err) {
                console.log(` Dati non disponibili per questa lega.`);
            }
        }
        console.log(`PIPELINE COMPLETATA! Il tuo DB è ora integro (Leghe e Squadre collegate).`);

    } catch (errore) {
        console.error("Errore critico:", errore.message);
    } finally {
        process.exit();
    }
}
avviaPipelineSportradarGlobale();