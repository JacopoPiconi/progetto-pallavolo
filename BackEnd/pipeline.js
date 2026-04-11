const gestore_connessioni = require('./db');
const axios = require('axios');
async function avviaPipelineETL() {
    console.log("⏳ Avvio procedura di Data Engineering...");

    try {
        // FASE 1: EXTRACT (Estrazione Dati Finti per ora)
        console.log("1. Estrazione dati...");
        const squadreGrezze = [
            { nome: "  Volley Milano  ", lega: 1 },
            { nome: "Trentino Volley", lega: 1 }
        ];

        console.log("2. Pulizia e normalizzazione dei dati...");
        const squadrePulite = squadreGrezze.map(squadra => {
            return {
                nome: squadra.nome.trim(), // Rimuove gli spazi vuoti extra
                lega: squadra.lega,
                rating_base: 1500 // Rating si partenza squadre
            };
        });

        // FASE 3: LOAD (Caricamento in MySQL)
        console.log("3. Caricamento nel database...");
        for (const s of squadrePulite) {
            const query = `INSERT INTO Squadre (nome_squadra, punteggio_rating, id_lega) VALUES (?, ?, ?)`;
            await gestore_connessioni.query(query, [s.nome, s.rating_base, s.lega]);
            console.log(`Squadra inserita: ${s.nome}`);
        }

        console.log("Pipeline completata con successo!");

    } catch (errore) {
        console.error("Errore:", errore.message);
    } finally {
        process.exit();
    }
}
avviaPipelineETL();