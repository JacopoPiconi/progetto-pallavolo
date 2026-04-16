import React from 'react';

function Classifiche({ onBackClick, onLoginClick, onNavClick }) {
  const leagues = [
    {
      name: "seria A1 Femminile",
      nation: "Italia",
      teams: [
        { pos: "1°", name: "Squadra Alpha", rating: 1650, trend: "up", points: 1650 },
        { pos: "2°", name: "Squadra Beta", rating: 1580, trend: "down", points: 1580 },
        { pos: "3°", name: "Squadra Epsilon", rating: 1540, trend: "neutral", points: 1540 },
      ]
    },
    {
      name: "SuperLega Maschile",
      nation: "Italia",
      teams: [
        { pos: "1°", name: "Squadra Gamma", rating: 1720, trend: "up", points: 1720 },
        { pos: "2°", name: "Squadra Zeta", rating: 1690, trend: "down", points: 1690 },
        { pos: "3°", name: "Squadra Delta", rating: 1600, trend: "neutral", points: 1600 },
      ]
    }
  ];

  const renderTrend = (trend) => {
    if (trend === "up") return <span style={{color: '#ef4444'}}>📈</span>;
    if (trend === "down") return <span style={{color: '#3b82f6'}}>📉</span>;
    return <span style={{color: '#94a3b8'}}>—</span>;
  };

  return (
    <div style={containerStyle}>
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

      <div style={subMenuStyle}>
        <span onClick={() => onNavClick('dashboard')} style={subMenuItem}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span style={activeSubMenu}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h1 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>classifiche</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>ranking squadre basato su sistema Elo modificato</p>

        {leagues.map((league, idx) => (
          <div key={idx} style={leagueCard}>
            <div style={leagueHeader}>
              <div>
                <div style={{fontWeight: 'bold', color: '#1e293b'}}>{league.name}</div>
                <div style={{fontSize: '0.8rem', color: '#94a3b8'}}>Nazione: {league.nation}</div>
              </div>
              <div style={badgeCount}>{league.teams.length} Squadre</div>
            </div>

            <table style={tableStyle}>
              <thead>
                <tr style={theadStyle}>
                  <th style={thStyle}>Posizione</th>
                  <th style={{...thStyle, textAlign: 'left'}}>Squadra</th>
                  <th style={thStyle}>Rating Elo</th>
                  <th style={thStyle}>Trend</th>
                  <th style={{...thStyle, textAlign: 'right', color: '#3949ab'}}>Punti</th>
                </tr>
              </thead>
              <tbody>
                {league.teams.map((team, tIdx) => (
                  <tr key={tIdx} style={trStyle}>
                    <td style={tdStyle}>{team.pos}</td>
                    <td style={{...tdStyle, textAlign: 'left'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <div style={teamLogo}>S</div>
                        {team.name}
                      </div>
                    </td>
                    <td style={tdStyle}>{team.rating}</td>
                    <td style={tdStyle}>{renderTrend(team.trend)}</td>
                    <td style={{...tdStyle, textAlign: 'right', fontWeight: 'bold', color: '#3949ab'}}>{team.points}</td>
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

// STILI
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };

const leagueCard = { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '30px', border: '1px solid #e2e8f0' };
const leagueHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' };
const badgeCount = { border: '1px solid #e2e8f0', padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', color: '#64748b' };

const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const theadStyle = { borderBottom: '1px solid #f1f5f9' };
const thStyle = { padding: '12px', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' };
const trStyle = { borderBottom: '1px solid #f8fafc' };
const tdStyle = { padding: '15px 12px', color: '#1e293b', fontSize: '0.95rem', textAlign: 'center' };

const teamLogo = { width: '32px', height: '32px', background: '#0000ff', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' };

const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Classifiche;