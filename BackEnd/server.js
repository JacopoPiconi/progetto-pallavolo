import express from 'express';
import cors from 'cors';
import gestore_connessioni from './db.js'; 

import giocatoriRoutes from './routes/giocatori.js';
import classificheRoutes from './routes/classifiche.js';
import partiteRoutes from './routes/partite.js';
import squadreRoutes from './routes/squadre.js';
import matchRoutes from './routes/match.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Il backend funziona correttamente!' });
});

// Usiamo la rotta
app.use('/api/giocatori', giocatoriRoutes);
app.use('/api/classifiche', classificheRoutes);
app.use('/api/partite', partiteRoutes);
app.use('/api/squadre', squadreRoutes);
app.use('/api/match', matchRoutes);

app.post('/api/registrazione', async (req, res) => {
    // Estraiamo i dati che il frontend ci ha inviato
    const { nome, cognome, email, password } = req.body;

    try {
        // Query di inserimento. Ruolo 'tifoso' assegnato di default
        const query = `
            INSERT INTO utenti (nome, cognome, email, password, ruolo_assegnato) 
            VALUES (?, ?, ?, ?, 'tifoso')
        `;
        
        // Eseguiamo la query (assicurati di usare il nome corretto della tua variabile di connessione)
        await gestore_connessioni.query(query, [nome, cognome, email, password]);

        // Rispondiamo al frontend che è andato tutto bene
        res.status(201).json({ message: "Utente registrato con successo" });

    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        
        // Controllo se l'email esiste già nel database
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: "Questa email è già registrata!" });
        }
        
        res.status(500).json({ message: "Errore interno del server" });
    }
});

// Aggiungi questa rotta nel tuo file principale del backend
app.get('/api/utenti', async (req, res) => {
    try {
        // Estraiamo tutti i dati utili per il login e la gestione
        const query = "SELECT id_utente, nome, cognome, email, password, ruolo_assegnato FROM utenti";
        const [utenti] = await gestore_connessioni.query(query);
        
        res.status(200).json(utenti);
    } catch (error) {
        console.error("Errore nel recupero utenti:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});