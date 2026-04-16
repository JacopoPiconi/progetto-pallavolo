import React, { useState, useEffect } from 'react';

function Giocatori({ onBackClick, onLoginClick, onNavClick, userRole }) {
  const [selectedTeam, setSelectedTeam] = useState('Tutte le squadre');
  
  // STATI PER IL BACKEND
  const [players, setPlayers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // CHIAMATA API AL DATABASE
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
        setError("Impossibile caricare i giocatori.");
        setLoading(false);
      });
  }, []);

  // Estraiamo le squadre uniche per il filtro
  const teams = ['Tutte le squadre', ...new Set(players.map(p => p.nome_squadra))];

  // Filtriamo i giocatori in base alla squadra scelta
  const filteredPlayers = selectedTeam === 'Tutte le squadre' 
    ? players 
    : players.filter(p => p.nome_squadra === selectedTeam);

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavClick('dashboard')}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={btnSec}>Home</button>
          <button onClick={onLoginClick} style={btnPri}>Accedi</button>
        </div>
      </nav>

      {/* SOTTOMENU CON MODIFICA ADMIN */}
      <div style={subMenuStyle}>
        <span onClick={() => onNavClick('dashboard')} style={subMenuItem}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span style={activeSubMenu}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
        
        {/* Tasto Admin visibile solo all'Admin */}
        {userRole === 'admin' && (
          <span onClick={() => onNavClick('gestione')} style={{...subMenuItem, color: '#fbc02d', fontWeight: 'bold', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px'}}>⚙️ Admin Panel</span>
        )}
      </div>

      <div style={{ padding: '30px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#1e293b' }}>Database Atleti</h2>
          <select 
            style={filterSelect}
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teams.map((team, idx) => (
              <option key={idx} value={team}>{team}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Caricamento atleti...</p>
        ) : error ? (
          <p style={{color: 'red'}}>{error}</p>
        ) : (
          <div style={playerGrid}>
            {filteredPlayers.map((player) => (
              <div key={player.id_giocatore} style={playerCard}>
                <div style={cardHeader}>
                  <div style={avatarCircle}>{player.cognome[0]}</div>
                  <div>
                    <div style={playerName}>{player.nome} {player.cognome}</div>
                    <div style={playerTeam}>{player.nome_squadra}</div>
                  </div>
                </div>
                <div style={roleBadge}>{player.ruolo}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// STILI ORIGINALI MANTENUTI
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const filterSelect = { padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white' };
const playerGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', marginTop: '20px' };
const playerCard = { background: 'white', borderRadius: '20px', padding: '25px', border: '1px solid #e2e8f0' };
const cardHeader = { display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' };
const avatarCircle = { width: '50px', height: '50px', background: '#7c3aed', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
const playerName = { fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b' };
const playerTeam = { color: '#94a3b8', fontSize: '0.9rem' };
const roleBadge = { background: '#eff6ff', color: '#1d4ed8', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Giocatori;