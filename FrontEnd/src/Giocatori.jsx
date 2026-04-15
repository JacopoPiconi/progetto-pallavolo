import React, { useState } from 'react';

function Giocatori({ onBackClick, onLoginClick, onNavClick }) {
  const [selectedTeam, setSelectedTeam] = useState('Tutte le squadre');

  const players = [
    {
      id: 1,
      nome: "Simone",
      cognome: "Giannelli",
      squadra: "Squadra Alpha",
      ruolo: "Palleggiatore",
      iniziali: "SG",
      stats: { aces: 0, muri: 0, attacco: 0 }
    }
  ];

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

      <div style={{ padding: '40px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 'bold', color: '#1e293b' }}>Giocatori</h1>
            <p style={{ color: '#94a3b8', marginTop: '5px' }}>Database anagrafiche e statistiche</p>
          </div>
          
          <select 
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={filterSelect}
          >
            <option value="Tutte le squadre">Tutte le squadre</option>
            <option value="Squadra Alpha">Squadra Alpha</option>
            <option value="Squadra Beta">Squadra Beta</option>
          </select>
        </div>

        <div style={playerGrid}>
          {players.map((p) => (
            <div key={p.id} style={playerCard}>
              <div style={cardHeader}>
                <div style={avatarCircle}>{p.iniziali}</div>
                <div>
                  <div style={playerName}>{p.nome} {p.cognome}</div>
                  <div style={playerTeam}>{p.squadra}</div>
                </div>
              </div>
              
              <div style={roleBadge}>🏐 {p.ruolo}</div>
              
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '20px 0 10px 0' }}>
                ID Giocatore: <span style={{ color: '#1e293b', fontWeight: 'bold' }}>#{p.id}</span>
              </div>

              <div style={statsContainer}>
                <div style={{ ...statBox, backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                  <div style={statLabel}>Aces</div>
                  <div style={statValue}>{p.stats.aces}</div>
                </div>
                <div style={{ ...statBox, backgroundColor: '#f0fdf4', color: '#15803d' }}>
                  <div style={statLabel}>Muri</div>
                  <div style={statValue}>{p.stats.muri}</div>
                </div>
                <div style={{ ...statBox, backgroundColor: '#faf5ff', color: '#7e22ce', width: '100%' }}>
                  <div style={statLabel}>% Attacco</div>
                  <div style={statValue}>{p.stats.attacco}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// STILI COORDINATI
const containerStyle = { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '35px', padding: '0 5%', background: 'white', borderBottom: '1px solid #e2e8f0', height: '50px', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '3px solid #1a237e', height: '100%', display: 'flex', alignItems: 'center' };

const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

const filterSelect = { padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer' };
const playerGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginTop: '20px' };
const playerCard = { background: 'white', borderRadius: '24px', padding: '30px', border: '1px solid #e2e8f0' };
const cardHeader = { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' };
const avatarCircle = { width: '60px', height: '60px', background: '#7c3aed', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };
const playerName = { fontWeight: 'bold', fontSize: '1.3rem', color: '#1e293b' };
const playerTeam = { color: '#94a3b8', fontSize: '0.95rem' };
const roleBadge = { background: '#eff6ff', color: '#1d4ed8', padding: '6px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' };
const statsContainer = { display: 'flex', flexWrap: 'wrap', gap: '12px' };
const statBox = { flex: '1', padding: '15px', borderRadius: '16px', textAlign: 'center' };
const statLabel = { fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase' };
const statValue = { fontSize: '1.2rem', fontWeight: 'bold' };

export default Giocatori;