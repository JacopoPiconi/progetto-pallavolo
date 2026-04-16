import React, { useState, useEffect } from 'react';

function MatchPred({ onBackClick, onLoginClick, onNavClick, userRole }) {
  const [squadre, setSquadre] = useState([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [prediction, setPrediction] = useState({ probA: 50, score: 'VS' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/squadre')
      .then(res => res.json())
      .then(data => {
        setSquadre(data);
        if (data.length >= 2) {
          setTeamA(data[0].id_squadra);
          setTeamB(data[1].id_squadra);
        }
      })
      .catch(err => console.error("Errore nel caricamento delle squadre:", err));
  }, []);

  useEffect(() => {
    if (!teamA || !teamB || teamA === teamB) return;
    setLoading(true);
    fetch(`http://localhost:3000/api/predict?teamA=${teamA}&teamB=${teamB}`)
      .then(res => res.json())
      .then(data => {
        setPrediction(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore pronostico:", err);
        setLoading(false);
      });
  }, [teamA, teamB]);

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

        {/* LOGICA ADMIN DOPO MATCH PREDICTOR */}
        {userRole === 'admin' && (
          <span onClick={() => onNavClick('gestione')} style={{...subMenuItem, color: '#fbc02d', fontWeight: 'bold', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px'}}>⚙️ Admin Panel</span>
        )}
      </div>

      <div style={{ padding: '40px 5%', textAlign: 'center' }}>
        <h1 style={{ color: '#1a237e' }}>AI Match Predictor</h1>
        <p style={{ color: '#64748b' }}>Analisi algoritmica basata sulle performance stagionali</p>

        <div style={predictorGrid}>
          {/* TEAM A */}
          <div style={teamCard}>
             <select style={select} value={teamA} onChange={(e) => setTeamA(e.target.value)}>
               {squadre.map(s => <option key={s.id_squadra} value={s.id_squadra}>{s.nome}</option>)}
             </select>
          </div>

          {/* RISULTATO */}
          <div style={{ flex: 1 }}>
            {loading ? <p>Analisi in corso...</p> : <h2 style={{fontSize: '3rem'}}>{prediction.score}</h2>}
          </div>

          {/* TEAM B */}
          <div style={teamCard}>
             <select style={select} value={teamB} onChange={(e) => setTeamB(e.target.value)}>
               {squadre.map(s => <option key={s.id_squadra} value={s.id_squadra}>{s.nome}</option>)}
             </select>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const predictorGrid = { display: 'flex', gap: '20px', alignItems: 'center', marginTop: '40px' };
const teamCard = { flex: 1, background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' };
const select = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 'bold' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default MatchPred;