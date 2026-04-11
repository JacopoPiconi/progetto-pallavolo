import React from 'react';

function Home({ onLoginClick }) {
  return (
    <div style={homeStyle}>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px' }}>
          VOLLEY<span style={{color: '#fbc02d'}}>ANALYTICS</span>
        </div>
        <button onClick={onLoginClick} style={loginBtnStyle}>Accedi / Account</button>
      </nav>

      {/* HERO SECTION */}
      <header style={heroSection}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '10px'}}>Piattaforma di Sport Analytics</h1>
        <p style={{fontSize: '1.2rem', opacity: '0.9'}}>Analizza le prestazioni e prevedi i risultati della tua squadra.</p>
        <button style={ctaStyle}>Esplora Statistiche</button>
      </header>

      {/* SEZIONE FUNZIONALITÀ */}
      <section style={featuresContainer}>
        <div style={featureCard}>
          <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>📊</div>
          <h3>Statistiche Live</h3>
          <p>Dati estratti automaticamente dai campionati ufficiali.</p>
        </div>
        <div style={featureCard}>
          <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>🔮</div>
          <h3>Match Predictor</h3>
          <p>Usa l'algoritmo avanzato per prevedere l'esito delle partite.</p>
        </div>
        <div style={featureCard}>
          <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>📋</div>
          <h3>Gestione Team</h3>
          <p>Monitora lo stato di forma dei tuoi giocatori.</p>
        </div>
      </section>
    </div>
  );
}

// --- TUTTI GLI STILI SONO QUI SOTTO ---
// Controlla che non ci siano doppioni di queste variabili

const homeStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  fontFamily: 'sans-serif',
  color: '#1e293b'
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 10%',
  height: '80px',
  background: '#1a237e',
  color: 'white',
  boxShadow: '0 4px-12px rgba(0,0,0,0.1)'
};

const loginBtnStyle = {
  padding: '10px 25px',
  backgroundColor: '#fbc02d',
  color: '#1a237e',
  border: 'none',
  borderRadius: '50px', // Bordo arrotondato pillola
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem'
};

const heroSection = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '120px 20px',
  background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
  color: 'white'
};

const ctaStyle = {
  padding: '16px 35px',
  fontSize: '1.1rem',
  backgroundColor: '#fbc02d',
  color: '#1a237e',
  border: 'none',
  borderRadius: '100px', // Bordo arrotondato pillola
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '30px',
  boxShadow: '0 4px 15px rgba(251, 192, 45, 0.4)'
};

const featuresContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  padding: '80px 10%',
  flexWrap: 'wrap'
};

const featureCard = {
  backgroundColor: 'white',
  padding: '40px 30px',
  borderRadius: '40px', // Bordo molto arrotondato
  width: '280px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  border: '1px solid #e2e8f0'
};

export default Home;