import React, { useState } from 'react';

function Login({ onBackClick, onGoToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Campi obbligatori");
      return;
    }

    // Controllo Admin (Esempio)
    if (email === 'admin@volley.it' && password === 'admin123') {
      onLoginSuccess({ nome: "Admin", ruolo: "admin" });
    } else {
      // Ogni altro accesso è un Tifoso
      onLoginSuccess({ nome: "Tifoso", ruolo: "tifoso" });
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={onBackClick} style={backFloatBtn}>← Torna Indietro</button>
      <div style={loginCard}>
        <h2 style={{color: '#1a237e'}}>Accedi</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{color: 'red', fontSize: '0.8rem'}}>{error}</p>}
          <input type="email" placeholder="Email" style={inputStyle} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" style={{...inputStyle, marginTop: '10px'}} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" style={loginBtn}>Entra</button>
        </form>
        <p onClick={onGoToRegister} style={{cursor: 'pointer', marginTop: '15px', fontSize: '0.9rem', color: '#64748b'}}>Non hai un account? Registrati</p>
      </div>
    </div>
  );
}

const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' };
const loginCard = { background: 'white', padding: '40px', borderRadius: '20px', width: '350px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' };
const loginBtn = { width: '100%', padding: '15px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' };
const backFloatBtn = { position: 'absolute', top: '20px', left: '20px', padding: '12px 24px', borderRadius: '50px', border: 'none', backgroundColor: '#1a237e', color: 'white', fontWeight: 'bold', cursor: 'pointer' };

export default Login;