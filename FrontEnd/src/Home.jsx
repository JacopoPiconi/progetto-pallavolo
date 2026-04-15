import React from 'react';

function Home({ onLoginClick, onExploreClick }) {
  return (
    <div style={homeStyle}>
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '1px' }}>
          VOLLEY<span style={{color: '#fbc02d'}}>ANALYTICS</span>
        </div>
        <button onClick={onLoginClick} style={loginBtnStyle}>Accedi / Account</button>
      </nav>

      {/* HERO SECTION (Il rettangolo blu) */}
      <header style={heroSection}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '10px', maxWidth: '800px'}}>
          Piattaforma di Sport Analytics
        </h1>
        <p style={{fontSize: '1.2rem', opacity: '0.9', marginBottom: '30px'}}>
          Analizza le prestazioni e prevedi i risultati della tua squadra di volley.
        </p>
        <button onClick={onExploreClick} style={ctaStyle}>
          Esplora Statistiche
        </button>
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

// --- STILI ---

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
  color: 'white'
};

const loginBtnStyle = {
  padding: '10px 25px',
  backgroundColor: '#fbc02d',
  color: '#1a237e',
  border: 'none',
  borderRadius: '50px',
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
  padding: '100px 20px',
  background: 'linear-gradient(180deg, #1a237e 0%, #3949ab 100%)',
  color: 'white',
  width: '100%'
};

const ctaStyle = {
  padding: '18px 45px',
  fontSize: '1.2rem',
  backgroundColor: '#fbc02d',
  color: '#1a237e',
  border: 'none',
  borderRadius: '100px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 6px 20px rgba(251, 192, 45, 0.4)',
  transition: '0.2s'
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
  borderRadius: '40px',
  width: '280px',
  textAlign: 'center',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  border: '1px solid #e2e8f0'
};

export default Home;