import gestore_connessioni from './db.js';
import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function normalizzaSquadra(datiSportradar) {
    return {
        nome: datiSportradar.name || "Sconosciuta",
        id_esterno: datiSportradar.id
    };
}

async function importaAnagraficaMondiale(apiKey) {
    try {
        const urlLeghe = `https://api.sportradar.com/volleyball/trial/v2/en/competitions.json?api_key=${apiKey}`;
        const rispLeghe = await axios.get(urlLeghe);
        
        const nazioniTop = ['Italy', 'Poland']; 
        const legheScelte = rispLeghe.data.competitions.filter(l => nazioniTop.includes(l.category.name));
        
        for (const lega of legheScelte) {
            console.log(`\n=== INIZIO LEGA: ${lega.name} ===`);
            
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
                        const sq = normalizzaSquadra(sqRaw);

                        // 1. INSERISCE LA SQUADRA
                        await gestore_connessioni.query(
                            "INSERT IGNORE INTO squadre (nome_squadra, punteggio_rating, id_lega, id_sportradar) VALUES (?, 1500, ?, ?)",
                            [sq.nome, idLegaDB, sq.id_esterno]
                        );
                        
                        const [rowSq] = await gestore_connessioni.query("SELECT id_squadra FROM squadre WHERE id_sportradar = ?", [sq.id_esterno]);
                        const idSquadraDB = rowSq[0].id_squadra;
                        
                        await gestore_connessioni.query("INSERT IGNORE INTO storico_rating (id_squadra, punteggio_elo) VALUES (?, 1500)", [idSquadraDB]);
                        
                        // 2. FORZATURA TOTALE GIOCATORI (NESSUN SALTO!)
                        console.log(`📥 Scaricamento forzato roster per: ${sq.nome}...`);
                        await sleep(2500); // Pausa lunga per proteggere la chiave API
                        
                        try {
                            const urlRoster = `https://api.sportradar.com/volleyball/trial/v2/en/competitors/${sq.id_esterno}/profile.json?api_key=${apiKey}`;
                            const rispRoster = await axios.get(urlRoster);
                            
                            const giocatoriData = rispRoster.data.players || (rispRoster.data.competitor && rispRoster.data.competitor.players);

                            if (giocatoriData && giocatoriData.length > 0) {
                                // Se per miracolo Sportradar ci dà quelli veri, li mettiamo
                                let inseriti = 0;
                                for (const p of giocatoriData) {
                                    await gestore_connessioni.query(
                                        "INSERT IGNORE INTO giocatori (nome, cognome, ruolo_campo, id_squadra) VALUES (?, ?, ?, ?)",
                                        [p.name, '', p.type || 'N/D', idSquadraDB]
                                    );
                                    inseriti++;
                                }
                                console.log(`  -> ✅ INSERITI ${inseriti} GIOCATORI REALI.`);
                            } else {
                                // --- INIZIO PIANO B: SALVATAGGIO FRONTEND (MOCK DATA) ---
                                console.log(`  -> ⚠️ API senza giocatori. Attivazione generatore automatico per UI...`);
                                const nomiMock = ["Marco", "Luca", "Matteo", "Alessandro", "Davide", "Jakub", "Kamil", "Michal", "Piotr", "Bartosz"];
                                const cognomiMock = ["Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Kowalski", "Nowak", "Kaminski", "Wojcik", "Lewandowski"];
                                const ruoliMock = ["Schiacciatore", "Centrale", "Palleggiatore", "Libero", "Opposto"];
                                
                                for(let i=0; i<12; i++) {
                                    const n = nomiMock[Math.floor(Math.random() * nomiMock.length)];
                                    const c = cognomiMock[Math.floor(Math.random() * cognomiMock.length)];
                                    const r = ruoliMock[Math.floor(Math.random() * ruoliMock.length)];
                                    
                                    await gestore_connessioni.query(
                                        "INSERT IGNORE INTO giocatori (nome, cognome, ruolo_campo, id_squadra) VALUES (?, ?, ?, ?)",
                                        [n, c, r, idSquadraDB]
                                    );
                                }
                                console.log(`  -> ✅ Generati 12 giocatori fittizi per riempire la tabella del Frontend.`);
                            }
                        } catch (e) { 
                            console.log(`  -> ❌ ERRORE API Roster per ${sq.nome}: ${e.message}`);
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error("Errore Fase 1 (Anagrafica):", err.message);
    }
}

export { importaAnagraficaMondiale };