import React, { useState, useEffect } from 'react';

function Calendario({ onBackClick, onLoginClick, onNavClick, userRole }) {
  const [matches, setMatches] = useState([]);
  const [paginaCorrente, setPaginaCorrente] = useState(1);
  const partitePerPagina = 30; 

  useEffect(() => {
    fetch('http://localhost:3000/api/partite')
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error("Errore nel recupero partite:", err));
  }, []);

  const totalePagine = Math.ceil(matches.length / partitePerPagina);
  const indiceUltimaPartita = paginaCorrente * partitePerPagina;
  const indicePrimaPartita = indiceUltimaPartita - partitePerPagina;
  const partiteDaMostrare = matches.slice(indicePrimaPartita, indiceUltimaPartita);

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
        <span style={activeSubMenu}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
        {userRole === 'admin' && (
          <span onClick={() => onNavClick('gestione')} style={{...subMenuItem, color: '#fbc02d', fontWeight: 'bold', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px'}}>⚙️ Admin Panel</span>
        )}
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '30px' }}>Calendario Incontri</h2>
        {partiteDaMostrare.map((m) => (
          <div key={m.id_partita} style={matchCard}>
            <div style={vsContainer}>
              <span>{m.squadra_casa}</span>
              <b style={{margin: '0 15px'}}>{m.stato === 'completata' ? m.risultato_set : 'VS'}</b>
              <span>{m.squadra_trasferta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const matchCard = { background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '15px', border: '1px solid #e2e8f0' };
const vsContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Calendario;