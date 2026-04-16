import React, { useState } from 'react';

function Registrazione({ onBackClick }) {
  const [regData, setRegData] = useState({ nome: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regData.nome || !regData.email || !regData.password) {
      setError('Compila tutti i campi per registrarti.');
      return;
    }
    console.log("Dati registrazione per backend:", regData);
    alert("Registrazione effettuata!");
  };

  return (
    <div style={containerStyle}>
      <div style={loginCard}>
        <h2 style={{ color: '#1a237e' }}>Crea Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</p>}
          <input type="text" placeholder="Nome" style={inputStyle} onChange={(e)=>setRegData({...regData, nome: e.target.value})} />
          <input type="email" placeholder="Email" style={{...inputStyle, marginTop: '10px'}} onChange={(e)=>setRegData({...regData, email: e.target.value})} />
          <input type="password" placeholder="Password" style={{...inputStyle, marginTop: '10px'}} onChange={(e)=>setRegData({...regData, password: e.target.value})} />
          <button type="submit" style={regBtn}>Registrati</button>
        </form>
        <button onClick={onBackClick} style={{ background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', color: '#64748b' }}>Torna al Login</button>
      </div>
    </div>
  );
}

const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'sans-serif' };
const loginCard = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' };
const regBtn = { width: '100%', padding: '15px', background: '#1a237e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' };

export default Registrazione;