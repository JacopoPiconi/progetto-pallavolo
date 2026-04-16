import React, { useState, useEffect } from 'react';

function Calendario({ onBackClick, onLoginClick, onNavClick }) {
  const [matches, setMatches] = useState([]);

  // Caricamento dati dal Backend
  useEffect(() => {
    fetch('http://localhost:3000/api/partite')
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error("Errore nel recupero partite:", err));
  }, []);

  return (
    <div style={containerStyle}>
      {/* NAVBAR */}
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

      {/* SUB MENU */}
      <div style={subMenuStyle}>
        <span onClick={() => onNavClick('dashboard')} style={subMenuItem}>Dashboard</span>
        <span style={activeSubMenu}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '30px' }}>Calendario Incontri</h2>
        
        {matches.length === 0 ? (
          <p>Caricamento partite o nessun incontro in programma...</p>
        ) : (
          matches.map((m) => (
            <div key={m.id_partita} style={matchCard}>
              <div style={cardHeader}>
                {/* Formattiamo la data dal DB */}
                <span>{new Date(m.data_partita).toLocaleString('it-IT', { dateStyle: 'full', timeStyle: 'short' })}</span>
                <span style={{...statusBadge, background: m.stato === 'completata' ? '#dcfce7' : '#f1f5f9'}}>
                  {m.stato}
                </span>
              </div>
              
              <div style={vsContainer}>
                <div style={teamSide}>
                  <div style={{...logoCircle, background: '#1a237e', color: 'white'}}>{m.squadra_casa[0]}</div>
                  <span style={teamName}>{m.squadra_casa}</span>
                </div>
                
                <div style={{textAlign: 'center', minWidth: '100px'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold'}}>
                    {m.stato === 'completata' ? m.risultato_set : 'VS'}
                  </div>
                </div>

                <div style={teamSide}>
                  <div style={{...logoCircle, background: '#fbc02d', color: '#1a237e'}}>{m.squadra_trasferta[0]}</div>
                  <span style={teamName}>{m.squadra_trasferta}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// STILI (Mantenuti dal tuo originale)
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const btnPri = { padding: '8px 25px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const matchCard = { background: 'white', borderRadius: '20px', padding: '25px', marginBottom: '25px', border: '1px solid #e2e8f0', position: 'relative' };
const cardHeader = { display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' };
const statusBadge = { padding: '2px 10px', borderRadius: '10px', fontSize: '0.7rem' };
const vsContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' };
const teamSide = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' };
const logoCircle = { width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' };
const teamName = { fontWeight: 'bold', color: '#1e293b' };

export default Calendario;