import React from 'react';

function Calendario({ onBackClick, onLoginClick, onNavClick }) {
  const matches = [
    { id: 1, data: "domenica 5 aprile 2026 ore 18:00", casa: "Squadra Alpha", ratingCasa: 1650, ospite: "Squadra Beta", ratingOspite: 1580 },
    { id: 2, data: "lunedì 6 aprile 2026 ore 20:30", casa: "Squadra Gamma", ratingCasa: 1720, ospite: "Squadra Delta", ratingOspite: 1600 }
  ];

  return (
    <div style={containerStyle}>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div>
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
        <span style={subMenuItem}>Giocatori</span>
        <span style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '5px' }}>calendario partite</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Programmazione e risultati dei match</p>

        {matches.map((m) => (
          <div key={m.id} style={matchCard}>
            <div style={cardHeader}>
              <span>Match #{m.id}</span>
              <span style={statusBadge}>programmata</span>
            </div>
            <p style={matchDate}>{m.data}</p>

            <div style={vsContainer}>
              {/* Squadra Casa */}
              <div style={teamSide}>
                <div style={{...logoCircle, backgroundColor: '#dbeafe', color: '#2563eb'}}>S</div>
                <div style={teamName}>{m.casa}</div>
                <div style={ratingLabel}>Rating: {m.ratingCasa}</div>
                <div style={locationTag}>Casa</div>
              </div>

              <div style={vsText}>VS</div>

              {/* Squadra Trasferta */}
              <div style={teamSide}>
                <div style={{...logoCircle, backgroundColor: '#fee2e2', color: '#dc2626'}}>S</div>
                <div style={teamName}>{m.ospite}</div>
                <div style={ratingLabel}>Rating: {m.ratingOspite}</div>
                <div style={locationTag}>Trasferta</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// STILI CALENDARIO
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };

const matchCard = { background: 'white', borderRadius: '20px', padding: '25px', marginBottom: '25px', border: '1px solid #e2e8f0', position: 'relative' };
const cardHeader = { display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem' };
const statusBadge = { background: '#f1f5f9', padding: '2px 10px', borderRadius: '10px', fontSize: '0.7rem' };
const matchDate = { color: '#94a3b8', marginTop: '5px', fontSize: '0.9rem' };

const vsContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' };
const teamSide = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' };
const logoCircle = { width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' };
const teamName = { fontWeight: 'bold', color: '#1e293b' };
const ratingLabel = { fontSize: '0.8rem', color: '#94a3b8', margin: '3px 0' };
const locationTag = { fontSize: '0.65rem', textTransform: 'uppercase', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '5px', color: '#64748b' };
const vsText = { fontSize: '2rem', color: '#cbd5e1', margin: '0 50px' };

const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Calendario;