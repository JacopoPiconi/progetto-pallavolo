import React from 'react';

function Dashboard({ onBackClick, onLoginClick }) {
  return (
    <div style={containerStyle}>
      {/* NAVBAR SUPERIORE (Stile Mockup Enterprise) */}
      <nav style={navStyle}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Piattaforma enterprise di sport analytics</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Tasto per tornare alla Home pubblico */}
          <button onClick={onBackClick} style={backBtnDashboardStyle}>Home</button>
          
          {/* Tasto Login richiesto */}
          <button onClick={onLoginClick} style={loginBtnDashboardStyle}>Accedi / Registrati</button>
        </div>
      </nav>

      {/* MENU DI NAVIGAZIONE INTERNO (Sotto la Navbar) */}
      <div style={subMenuStyle}>
        <span style={activeSubMenu}>Dashboard</span>
        <span style={subMenuItem}>Calendario</span>
        <span style={subMenuItem}>Classifiche</span>
        <span style={subMenuItem}>Giocatori</span>
        <span style={subMenuItem}>Match Predictor</span>
      </div>

      {/* CONTENUTO PRINCIPALE */}
      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '5px' }}>Dashboard Analytics</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Panoramica generale delle statistiche pallavolo</p>

        {/* GRIGIA CARD KPI (Quelle in alto) */}
        <div style={statsGrid}>
          <div style={kpiCard}>
            <p style={kpiLabel}>Squadre Monitorate</p>
            <h3 style={kpiValue}>6</h3>
            <p style={kpiSubText}>Database attivo</p>
          </div>
          <div style={kpiCard}>
            <p style={kpiLabel}>Partite Programmate</p>
            <h3 style={kpiValue}>2</h3>
            <p style={kpiSubText}>Prossimi match</p>
          </div>
          <div style={kpiCard}>
            <p style={kpiLabel}>Rating Medio</p>
            <h3 style={kpiValue}>1630</h3>
            <p style={kpiSubText}>Sistema Elo modificato</p>
          </div>
          <div style={kpiCard}>
            <p style={kpiLabel}>Leghe Attive</p>
            <h3 style={kpiValue}>2</h3>
            <p style={kpiSubText}>Campionati</p>
          </div>
        </div>

        {/* GRIGLIA PRINCIPALE (Le due card grandi) */}
        <div style={mainGrid}>
          {/* Card Top Squadre */}
          <div style={largeCard}>
            <h4 style={cardTitle}>Top Squadre per Rating</h4>
            <p style={cardSubTitle}>Sistema di valutazione Elo per pallavolo</p>
            <ul style={listStyle}>
              <li style={listItem}><span>1 Squadra Gamma</span> <span style={rankVal}>1720</span></li>
              <li style={listItem}><span>2 Squadra Zeta</span> <span style={rankVal}>1690</span></li>
              <li style={listItem}><span>3 Squadra Alpha</span> <span style={rankVal}>1650</span></li>
              <li style={listItem}><span>4 Squadra Delta</span> <span style={rankVal}>1600</span></li>
              <li style={listItem}><span>5 Squadra Beta</span> <span style={rankVal}>1580</span></li>
            </ul>
          </div>

          {/* Card Prossime Partite */}
          <div style={largeCard}>
            <h4 style={cardTitle}>Prossime Partite</h4>
            <p style={cardSubTitle}>Calendario match programmati</p>
            <div style={matchItem}>
                <div style={matchInfo}>
                    <span style={{fontWeight: 'bold'}}>Squadra Alpha</span>
                    <span style={{fontSize: '0.7rem', color: '#64748b'}}>dom 5 apr, 18:00</span>
                </div>
                <div style={vsBadge}>VS</div>
                <span style={{fontWeight: 'bold'}}>Squadra Beta</span>
            </div>
            <div style={matchItem}>
                <div style={matchInfo}>
                    <span style={{fontWeight: 'bold'}}>Squadra Gamma</span>
                    <span style={{fontSize: '0.7rem', color: '#64748b'}}>lun 6 apr, 20:30</span>
                </div>
                <div style={vsBadge}>VS</div>
                <span style={{fontWeight: 'bold'}}>Squadra Delta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STILI CSS-IN-JS ---

const containerStyle = { 
  minHeight: '100vh', 
  backgroundColor: '#f1f5f9', 
  fontFamily: 'sans-serif' 
};

const navStyle = {
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  padding: '10px 5%', 
  background: '#1a237e', 
  color: 'white'
};

const loginBtnDashboardStyle = {
  padding: '10px 25px',
  backgroundColor: '#fbc02d',
  color: '#1a237e',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  boxShadow: '0 4px 12px rgba(251, 192, 45, 0.3)'
};

const backBtnDashboardStyle = {
  padding: '10px 25px',
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '0.9rem'
};

const subMenuStyle = {
  display: 'flex', 
  gap: '40px', 
  padding: '15px 5%',
  background: 'white', 
  borderBottom: '1px solid #e2e8f0'
};

const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };

const statsGrid = {
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px', 
  marginBottom: '30px'
};

const kpiCard = {
  background: 'white', 
  padding: '20px', 
  borderRadius: '15px',
  border: '1px solid #e2e8f0', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const kpiLabel = { margin: 0, color: '#64748b', fontSize: '0.9rem' };
const kpiValue = { margin: '5px 0', fontSize: '1.8rem', color: '#1e293b' };
const kpiSubText = { margin: 0, color: '#94a3b8', fontSize: '0.75rem' };

const mainGrid = {
  display: 'grid', 
  gridTemplateColumns: '1fr 1.5fr', 
  gap: '20px'
};

const largeCard = {
  background: 'white', 
  padding: '25px', 
  borderRadius: '15px',
  border: '1px solid #e2e8f0'
};

const cardTitle = { margin: 0, fontSize: '1.1rem', color: '#1e293b' };
const cardSubTitle = { margin: '5px 0 20px 0', fontSize: '0.85rem', color: '#94a3b8' };

const listStyle = { listStyle: 'none', padding: 0 };
const listItem = {
  display: 'flex', 
  justifyContent: 'space-between',
  padding: '10px 0', 
  borderBottom: '1px solid #f1f5f9', 
  color: '#475569'
};
const rankVal = { color: '#3949ab', fontWeight: 'bold' };

const matchItem = {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    padding: '15px', 
    background: '#f8fafc', 
    borderRadius: '12px', 
    marginBottom: '10px'
};

const matchInfo = { display: 'flex', flexDirection: 'column' };
const vsBadge = {
    background: 'white', 
    padding: '4px 8px', 
    borderRadius: '6px',
    fontSize: '0.7rem', 
    fontWeight: 'bold', 
    border: '1px solid #e2e8f0'
};

export default Dashboard;