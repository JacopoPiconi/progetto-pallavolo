import React, { useState, useEffect } from 'react';

function Giocatori({ onBackClick, onLoginClick, onNavClick }) {
  const [selectedTeam, setSelectedTeam] = useState('Tutte le squadre');
  
  // STATI PER IL BACKEND
  const [players, setPlayers] = useState([]); // Qui salveremo i giocatori dal database
  const [loading, setLoading] = useState(true); // Per mostrare un testo di caricamento
  const [error, setError] = useState(null);

  // CHIAMATA API AL DATABASE AL CARICAMENTO DELLA PAGINA
  useEffect(() => {
    fetch('http://localhost:3000/api/giocatori')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server');
        }
        return response.json();
      })
      .then(data => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore nel caricamento dei giocatori:", error);
        setError("Impossibile caricare i giocatori. Verifica che il backend sia acceso.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={containerStyle}>
      {/* NAVBAR BLU - Stile Enterprise */}
      <nav style={navStyle}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavClick('dashboard')}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Piattaforma enterprise di sport analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={btnSec}>Home</button>
          <button onClick={onLoginClick} style={btnPri}>Accedi</button>
        </div>
      </nav>

      {/* SUB MENU BIANCO */}
      <div style={subMenuStyle}>
        <span onClick={() => onNavClick('dashboard')} style={subMenuItem}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span style={activeSubMenu}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#1e293b' }}>Database Atleti</h2>
          <select 
            style={filterSelect} 
            value={selectedTeam} 
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option>Tutte le squadre</option>
            <option>Squadra Alpha</option>
            <option>Squadra Beta</option>
          </select>
        </div>

        {/* Gestione Errori o Caricamento */}
        {loading && <p style={{textAlign: 'center', marginTop: '50px'}}>Caricamento giocatori in corso...</p>}
        {error && <p style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>{error}</p>}
        {!loading && !error && players.length === 0 && <p style={{textAlign: 'center', marginTop: '50px'}}>Nessun giocatore trovato nel database.</p>}

        {/* GRIGLIA GIOCATORI */}
        {!loading && !error && players.length > 0 && (
          <div style={playerGrid}>
            {players.map(player => (
              <div key={player.id_giocatore} style={playerCard}>
                <div style={cardHeader}>
                  <div style={avatarCircle}>
                    {/* Prende la prima lettera del nome e del cognome per l'avatar rotondo */}
                    {player.nome ? player.nome.charAt(0).toUpperCase() : ''}
                    {player.cognome ? player.cognome.charAt(0).toUpperCase() : ''}
                  </div>
                  <div>
                    <div style={playerName}>{player.nome} {player.cognome}</div>
                    <div style={playerTeam}>Squadra ID: {player.id_squadra}</div>
                  </div>
                </div>

                {/* RUOLO CAMPO (Preso direttamente dal DB) */}
                <div style={{ marginBottom: '20px' }}>
                  <span style={roleBadge}>{player.ruolo_campo}</span>
                </div>

                <div style={statsGrid}>
                  <div style={statBox}>
                    <div style={statValue}>0</div>
                    <div style={statLabel}>Aces</div>
                  </div>
                  <div style={statBox}>
                    <div style={statValue}>0</div>
                    <div style={statLabel}>Muri</div>
                  </div>
                  <div style={statBox}>
                    <div style={statValue}>0</div>
                    <div style={statLabel}>Punti</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- STILI CSS (Identici a quelli originali del tuo amico) ---
const containerStyle = { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '3px solid #1a237e', height: '100%', display: 'flex', alignItems: 'center' };

const btnPri = { padding: '8px 25px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

const filterSelect = { padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer' };
const playerGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginTop: '20px' };
const playerCard = { background: 'white', borderRadius: '24px', padding: '30px', border: '1px solid #e2e8f0' };
const cardHeader = { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' };
const avatarCircle = { width: '60px', height: '60px', background: '#7c3aed', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' };
const playerName = { fontWeight: 'bold', fontSize: '1.3rem', color: '#1e293b' };
const playerTeam = { color: '#94a3b8', fontSize: '0.95rem' };
const roleBadge = { background: '#eff6ff', color: '#1d4ed8', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', textTransform: 'capitalize' };

const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#f8fafc', padding: '15px', borderRadius: '15px' };
const statBox = { textAlign: 'center' };
const statValue = { fontWeight: 'bold', fontSize: '1.2rem', color: '#1e293b' };
const statLabel = { fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' };

export default Giocatori;