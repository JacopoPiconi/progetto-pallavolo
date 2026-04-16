import React from 'react';

function Home({ onLoginClick, onExploreClick }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <nav style={navStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>VOLLEY<span style={{color: '#fbc02d'}}>ANALYTICS</span></div>
        <button onClick={onLoginClick} style={loginBtnStyle}>Accedi / Account</button>
      </nav>
      <header style={heroSection}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '10px'}}>Piattaforma di Sport Analytics</h1>
        <p style={{fontSize: '1.2rem', opacity: '0.9', marginBottom: '30px'}}>Analizza le prestazioni e prevedi i risultati della tua squadra.</p>
        <button onClick={onExploreClick} style={ctaStyle}>Esplora Statistiche</button>
      </header>
    </div>
  );
}

const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10%', height: '80px', background: '#1a237e', color: 'white' };
const loginBtnStyle = { padding: '10px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' };
const heroSection = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '100px 20px', background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)', color: 'white' };
const ctaStyle = { padding: '18px 45px', fontSize: '1.2rem', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '100px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 20px rgba(251, 192, 45, 0.4)' };

export default Home;