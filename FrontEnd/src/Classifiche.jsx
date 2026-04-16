import React, { useState, useEffect } from 'react';

function Classifiche({ onBackClick, onLoginClick, onNavClick }) {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/classifiche')
      .then(res => res.json())
      .then(data => {
        // Trasformiamo la lista piatta in un array raggruppato per lega
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.nome_lega]) {
            acc[item.nome_lega] = { name: item.nome_lega, nation: item.nazione, teams: [] };
          }
          acc[item.nome_lega].teams.push(item);
          return acc;
        }, {});
        setLeagues(Object.values(grouped));
      })
      .catch(err => console.error("Errore classifiche:", err));
  }, []);

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
        <span style={activeSubMenu}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        {leagues.map((league, idx) => (
          <div key={idx} style={leagueCard}>
            <div style={leagueHeader}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b' }}>{league.name}</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{league.nation}</p>
              </div>
            </div>
            <table style={tableStyle}>
              <thead>
                <tr style={theadStyle}>
                  <th style={thStyle}>Pos</th>
                  <th style={{...thStyle, textAlign: 'left'}}>Squadra</th>
                  <th style={thStyle}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {league.teams.map((team, tIdx) => (
                  <tr key={team.id_squadra} style={trStyle}>
                    <td style={tdStyle}>{tIdx + 1}°</td>
                    <td style={{...tdStyle, textAlign: 'left', fontWeight: 'bold'}}>{team.nome_squadra}</td>
                    <td style={tdStyle}>{team.punteggio_rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

// STILI (Mantenuti)
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const btnPri = { padding: '8px 25px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const leagueCard = { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '30px', border: '1px solid #e2e8f0' };
const leagueHeader = { marginBottom: '20px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const theadStyle = { borderBottom: '1px solid #f1f5f9' };
const thStyle = { padding: '12px', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' };
const trStyle = { borderBottom: '1px solid #f8fafc' };
const tdStyle = { padding: '15px 12px', color: '#1e293b', fontSize: '0.95rem', textAlign: 'center' };

export default Classifiche;