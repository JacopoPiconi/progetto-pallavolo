import axios from 'axios';
import { importaAnagraficaMondiale } from './fase_anagrafica.js';
import { importaRisultatiEUpdateElo } from './fase_risultati.js';
import { generaPronosticiFuturi } from './fase_pronostici.js';

// Funzione di sleep per gestire i ritardi tra le chiamate API
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function avviaSistemaMultiThread() {
    console.log("VOLLEY ANALYTICS SYSTEM: PRO EDITION (MULTI-API) ===");
    const key1 = process.env.API_KEY_FASE1;
    const key2 = process.env.API_KEY_FASE2;
    const key3 = process.env.API_KEY_FASE3;

    if (!key1 || !key2 || !key3) {
        console.error("ERRORE: Inserisci le 3 chiavi API nel file .env!");
        process.exit();
    }

    try {
        //STEP 1: ANAGRAFICA (Usa la Chiave 1) ---
        console.log("\n[STEP 1] Popolamento Database con Sistema di Cache...");
        await importaAnagraficaMondiale(key1);
        //STEP 2 e 3: RISULTATI/ELO + PRONOSTICI (Usano Chiavi 2 e 3)
        console.log("\nRicerca stagioni valide per l'elaborazione...");
        await sleep(2000);
        
        const urlLeghe= `https://api.sportradar.com/volleyball/trial/v2/en/competitions.json?api_key=${key1}`;
        const rispLeghe = await axios.get(urlLeghe);
        
        // Per il test usiamo le due nazioni principali
        const nazioniTop = ['Italy', 'Poland'];
        const legheSelezionate = rispLeghe.data.competitions.filter(l => nazioniTop.includes(l.category.name));

        for (const lega of legheSelezionate) {
            console.log(`\nAvvio elaborazione parallela per: ${lega.name}`);
            
            const urlStagioni = `https://api.sportradar.com/volleyball/trial/v2/en/competitions/${lega.id}/seasons.json?api_key=${key1}`;
            const rispStagioni= await axios.get(urlStagioni);
            const idStagione = rispStagioni.data.seasons[0].id; // Prendiamo la più recente
            
            await sleep(1500);

            // ESECUZIONE IN PARALLELO (Fase 2 usa Key2, Fase 3 usa Key3)
            console.log(`Lancio Fase 2 (Elo) e Fase 3 (Pronostici) IN CONTEMPORANEA per la stagione ${idStagione}...`);
    
            // Promise.allSettled fa girare le funzioni contemporaneamente senza che si blocchino a vicenda
            const risultatiParalleli = await Promise.allSettled([
                importaRisultatiEUpdateElo(idStagione, key2),
                generaPronosticiFuturi(idStagione, key3)
            ]);

            risultatiParalleli.forEach((res, index) => {
                const nomeFase= index === 0 ? "Fase 2 (Risultati/Elo)" : "Fase 3 (Pronostici)";
                if (res.status === 'fulfilled') {
                    console.log(`${nomeFase} completata con successo.`);
                } else {
                    console.log(`${nomeFase} fallita per rate-limit. Motivo:`, res.reason.message);
                }
            });

            await sleep(4000); // Pausa di respiro tra una lega e l'altra
        }

        console.log("\nPIPELINE GLOBALE TERMINATA CON SUCCESSO.");
    } catch (error) {
        console.error("\nErrore critico di sistema:", error.message);
    }
    
    process.exit();
}
avviaSistemaMultiThread();