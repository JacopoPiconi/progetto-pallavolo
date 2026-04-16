import React, { useState } from 'react';

function MatchPred({ onBackClick, onLoginClick, onNavClick }) {
  const [teamA, setTeamA] = useState('Squadra Alpha');
  const [teamB, setTeamB] = useState('Squadra Beta');

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

      <div style={subMenuStyle}>
        <span onClick={() => onNavClick('dashboard')} style={subMenuItem}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span style={activeSubMenu}>Match Predictor</span>
      </div>

      <div style={{ padding: '40px 5%' }}>
        <h1>Match Predictor</h1>
        <p style={{ color: '#94a3b8' }}>Algoritmo di simulazione match</p>

        <div style={predictorGrid}>
          <div style={teamCard}>
            <div style={{...avatar, backgroundColor: '#3949ab'}}>S</div>
            <select value={teamA} onChange={(e)=>setTeamA(e.target.value)} style={select}>
              <option>Squadra Alpha</option>
              <option>Squadra Gamma</option>
            </select>
          </div>

          <div style={centerSection}>
            <div style={winBadge}>64% Probabilità</div>
            <div style={barBg}><div style={{...barFill, width: '64%'}}></div></div>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Risultato: 3 - 1</div>
          </div>

          <div style={teamCard}>
            <div style={{...avatar, backgroundColor: '#ef4444'}}>S</div>
            <select value={teamB} onChange={(e)=>setTeamB(e.target.value)} style={select}>
              <option>Squadra Beta</option>
              <option>Squadra Delta</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '35px', padding: '0 5%', background: 'white', borderBottom: '1px solid #e2e8f0', height: '50px', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '3px solid #1a237e', height: '100%', display: 'flex', alignItems: 'center' };
const predictorGrid = { display: 'flex', gap: '20px', alignItems: 'center', marginTop: '30px' };
const teamCard = { flex: 1, background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' };
const avatar = { width: '70px', height: '70px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 20px' };
const select = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 'bold' };
const centerSection = { flex: 1, textAlign: 'center' };
const winBadge = { background: '#fbc02d', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' };
const barBg = { height: '12px', background: '#e2e8f0', borderRadius: '10px', margin: '20px 0' };
const barFill = { height: '100%', background: '#1a237e', borderRadius: '10px' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default MatchPred;