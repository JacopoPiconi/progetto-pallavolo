import React from 'react';

function Dashboard({ onBackClick, onLoginClick, onNavClick }) {
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
        <span style={activeSubMenu}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b' }}>Dashboard Analytics</h2>
        <div style={statsGrid}>
           <div style={kpiCard}><p>Squadre Monitorate</p><h3>6</h3></div>
           <div style={kpiCard}><p>Partite Programmate</p><h3>2</h3></div>
           <div style={kpiCard}><p>Rating Medio</p><h3>1630</h3></div>
           <div style={kpiCard}><p>Leghe Attive</p><h3>2</h3></div>
        </div>
        <div style={largeCard}>
           <h4>Top Squadre per Rating</h4>
           {['Squadra Gamma', 'Squadra Zeta', 'Squadra Alpha'].map((s, i) => (
             <div key={i} style={listItem}><span>{i+1}. {s}</span> <b>{1720 - (i*30)}</b></div>
           ))}
        </div>
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '20px 0' };
const kpiCard = { background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' };
const largeCard = { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0' };
const listItem = { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Dashboard;