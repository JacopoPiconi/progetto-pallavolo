import React from 'react';

function Login({ onBackClick }) {
  return (
    <div style={containerStyle}>
      <button onClick={onBackClick} style={backFloatBtn}>← Torna Indietro</button>
      
      <div style={loginCard}>
        <h2 style={{ textAlign: 'center', color: '#1a237e', marginBottom: '30px' }}>Accedi a VolleyAnalytics</h2>
        <div style={inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="latua@email.com" style={inputStyle} />
        </div>
        <div style={inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="••••••••" style={inputStyle} />
        </div>
        <button style={loginBtn}>Entra</button>
      </div>
    </div>
  );
}

const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'sans-serif' };
const backFloatBtn = { position: 'absolute', top: '20px', left: '20px', padding: '12px 24px', borderRadius: '50px', border: 'none', backgroundColor: '#1a237e', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' };
const loginCard = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const inputGroup = { marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' };
const loginBtn = { width: '100%', padding: '15px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };

export default Login;