import React from 'react';

function Calendario({ onBackClick, onLoginClick, onNavClick }) {
  const matches = [
    { data: "18 APR", ora: "18:00", casa: "Sir Susa Vim Perugia", ospite: "Itas Trentino" },
    { data: "19 APR", ora: "20:30", casa: "Lube Civitanova", ospite: "Modena Volley" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' }}>
        <div>
          <h2 style={{ margin: 0 }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Piattaforma enterprise di sport analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={{ padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' }}>Home</button>
          <button onClick={onLoginClick} style={{ padding: '10px 20px', backgroundColor: '#fbc02d', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Accedi</button>
        </div>
      </nav>

      {/* MENU COMPLETO RIPRISTINATO */}
      <div style={{ display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <span onClick={() => onNavClick('dashboard')} style={{ color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>Dashboard</span>
        <span style={{ color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' }}>Calendario</span>
        <span style={{ color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>Classifiche</span>
        <span style={{ color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>Giocatori</span>
        <span style={{ color: '#64748b', cursor: 'pointer', fontWeight: '500' }}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b' }}>Calendario Match</h2>
        {matches.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontWeight: 'bold', borderRight: '2px solid #f1f5f9', paddingRight: '20px', minWidth: '70px' }}>{m.data}</div>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {m.casa} <span style={{ background: '#f8fafc', padding: '5px 12px', borderRadius: '8px', margin: '0 20px', fontSize: '0.8rem', border: '1px solid #e2e8f0' }}>VS</span> {m.ospite}
            </div>
            <div style={{ color: '#64748b', fontWeight: '500' }}>{m.ora}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendario;