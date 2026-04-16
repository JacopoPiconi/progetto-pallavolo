import React, { useState, useEffect } from 'react';

function MatchPred({ onBackClick, onLoginClick, onNavClick }) {
  // Stati per memorizzare i dati dinamici
  const [squadre, setSquadre] = useState([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  
  const [prediction, setPrediction] = useState({ probA: 50, score: 'VS' });
  const [loading, setLoading] = useState(false);

  // 1. All'avvio, scarichiamo la lista delle squadre dal database
  useEffect(() => {
    fetch('http://localhost:3000/api/squadre')
      .then(res => res.json())
      .then(data => {
        setSquadre(data);
        // Selezioniamo le prime due squadre di default (se esistono)
        if (data.length >= 2) {
          setTeamA(data[0].id_squadra);
          setTeamB(data[1].id_squadra);
        }
      })
      .catch(err => console.error("Errore nel caricamento delle squadre:", err));
  }, []);

  // 2. Ogni volta che teamA o teamB cambiano, chiediamo il pronostico al server
  useEffect(() => {
    // Non facciamo chiamate se mancano le squadre o se l'utente ha scelto la stessa squadra
    if (!teamA || !teamB || teamA === teamB) return;

    setLoading(true);
    fetch('http://localhost:3000/api/match/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_squadra_A: teamA, id_squadra_B: teamB })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setPrediction({ probA: data.probabilita_A, score: data.risultato_stimato });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore durante la predizione:", err);
        setLoading(false);
      });
  }, [teamA, teamB]);

  return (
    <div style={containerStyle}>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavClick('dashboard')}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={btnSec}>Home</button>
          <button onClick={onLoginClick} style={btnPri}>Accedi</button>
        </div>
      </nav>

      {/* SUB MENU */}
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
          {/* SQUADRA CASA */}
          <div style={teamCard}>
            <div style={{...avatar, backgroundColor: '#3949ab'}}>C</div>
            <select value={teamA} onChange={(e) => setTeamA(e.target.value)} style={select}>
              {squadre.map(s => (
                <option key={`A-${s.id_squadra}`} value={s.id_squadra}>
                  {s.nome_squadra}
                </option>
              ))}
            </select>
          </div>

          {/* SEZIONE CENTRALE: RISULTATI E BARRA */}
          <div style={centerSection}>
            {loading ? (
              <div style={{ fontWeight: 'bold', color: '#64748b' }}>Calcolo in corso...</div>
            ) : teamA === teamB ? (
              <div style={{ color: '#ef4444', fontWeight: 'bold' }}>Seleziona squadre diverse</div>
            ) : (
              <>
                <div style={winBadge}>{prediction.probA}% Probabilità Casa</div>
                <div style={barBg}>
                  {/* La larghezza della barra cambia dinamicamente in base alla percentuale */}
                  <div style={{...barFill, width: `${prediction.probA}%`}}></div>
                </div>
                <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Risultato: {prediction.score}</div>
              </>
            )}
          </div>

          {/* SQUADRA TRASFERTA */}
          <div style={teamCard}>
            <div style={{...avatar, backgroundColor: '#ef4444'}}>T</div>
            <select value={teamB} onChange={(e) => setTeamB(e.target.value)} style={select}>
              {squadre.map(s => (
                <option key={`B-${s.id_squadra}`} value={s.id_squadra}>
                  {s.nome_squadra}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STILI (Mantenuti dal tuo file originale) ---
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
const barBg = { height: '12px', background: '#e2e8f0', borderRadius: '10px', margin: '20px 0', overflow: 'hidden' };
const barFill = { height: '100%', background: '#1a237e', borderRadius: '10px', transition: 'width 0.4s ease-in-out' }; // Aggiunta animazione fluida
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default MatchPred;