import gestore_connessioni from './db.js';

async function riempiUltimeTabelle() {
    console.log("=== AVVIO GENERATORE DATI FRONTEND (VERSIONE FINALE) ===");

    try {
        console.log("1. Recupero le partite dal database...");
        const [partite] = await gestore_connessioni.query("SELECT id_partita, id_squadra_casa, id_squadra_trasferta FROM partite");
        
        if (partite.length === 0) {
            console.log("❌ ERRORE: Non ci sono partite nel database! Fai prima girare la pipeline principale.");
            process.exit();
        }

        let statInserite = 0;
        let pronosticiInseriti = 0;

        for (const p of partite) {
            // --- GENERAZIONE STATISTICHE ---
            // Dati realistici per la squadra in CASA
            const aceCasa = Math.floor(Math.random() * 8) + 2;       // Tra 2 e 9 Ace
            const muriCasa = Math.floor(Math.random() * 10) + 4;     // Tra 4 e 13 Muri
            const errCasa = Math.floor(Math.random() * 12) + 5;      // Tra 5 e 16 Errori
            const puntiCasa = Math.floor(Math.random() * 30) + 65;   // Tra 65 e 94 Punti totali

            // Dati realistici per la squadra in TRASFERTA
            const aceTrasf = Math.floor(Math.random() * 8) + 2;
            const muriTrasf = Math.floor(Math.random() * 10) + 4;
            const errTrasf = Math.floor(Math.random() * 12) + 5;
            const puntiTrasf = Math.floor(Math.random() * 30) + 65;

            // Salvataggio Statistiche
            await gestore_connessioni.query(
                `INSERT IGNORE INTO statistiche_partite (id_partita, id_squadra, ace_fatti, muri_vincenti, errori_battuta, punti_totali) 
                 VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`,
                [
                    p.id_partita, p.id_squadra_casa, aceCasa, muriCasa, errCasa, puntiCasa,
                    p.id_partita, p.id_squadra_trasferta, aceTrasf, muriTrasf, errTrasf, puntiTrasf
                ]
            );
            statInserite += 2;

            // --- GENERAZIONE PRONOSTICI DEGLI UTENTI ---
            // Facciamo in modo che per ogni partita ci siano 3 o 4 tifosi che votano
            const numeroVotanti = Math.floor(Math.random() * 3) + 2; 

            for(let i=0; i<numeroVotanti; i++) {
                // Scegliamo un tifoso a caso (ID da 4 a 50)
                const idUtenteTifoso = Math.floor(Math.random() * 47) + 4; 
                
                // Il tifoso sceglie a caso chi vincerà (Casa o Trasferta)
                const prediceCasa = Math.random() > 0.5;
                const vincitorePredetto = prediceCasa ? p.id_squadra_casa : p.id_squadra_trasferta;
                
                // Percentuale di confidenza della previsione (es. 65%)
                const probabilita = Math.floor(Math.random() * 40) + 51; 

                await gestore_connessioni.query(
                    `INSERT IGNORE INTO pronostici (id_utente, id_partita, vincitore_predetto, probabilita_vittoria) 
                     VALUES (?, ?, ?, ?)`,
                    [idUtenteTifoso, p.id_partita, vincitorePredetto, probabilita]
                );
                pronosticiInseriti++;
            }
        }

        console.log(`-> ✅ Create ${statInserite} righe di statistiche per le partite.`);
        console.log(`-> ✅ Generati ${pronosticiInseriti} pronostici dai tifosi.`);
        console.log("\n=== OPERAZIONE CONCLUSA: IL TUO DATABASE È AL 100% COMPLETO! 🏆 ===");

    } catch (e) {
        console.error("Errore durante il salvataggio:", e.message);
    }
    
    process.exit();
}

riempiUltimeTabelle();