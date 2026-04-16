import React, { useState } from 'react';

function Registrazione({ onBackClick }) {
  // 1. Aggiunto 'cognome' nello stato iniziale
  const [regData, setRegData] = useState({ nome: '', cognome: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 2. Controllo che tutti i campi siano pieni
    if (!regData.nome || !regData.cognome || !regData.email || !regData.password) {
      setError('Compila tutti i campi per registrarti.');
      return;
    }

    try {
      // 3. Invio effettivo dei dati al nostro Backend
      const response = await fetch('http://localhost:3000/api/registrazione', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(regData),
      });

      if (response.ok) {
        setSuccess('Registrazione effettuata con successo! Ora puoi accedere.');
        // Svuotiamo i campi dopo il successo
        setRegData({ nome: '', cognome: '', email: '', password: '' });
      } else {
        const errData = await response.json();
        setError(errData.message || 'Errore durante la registrazione.');
      }
    } catch (err) {
      console.error("Errore di connessione:", err);
      setError('Impossibile connettersi al server. Controlla che il backend sia acceso.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginCard}>
        <h2 style={{ color: '#1a237e' }}>Crea Account</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Messaggi di Errore o Successo */}
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '10px' }}>{error}</p>}
          {success && <p style={{ color: '#22c55e', fontSize: '0.8rem', marginBottom: '10px' }}>{success}</p>}

          <input 
            type="text" 
            placeholder="Nome" 
            value={regData.nome}
            style={inputStyle} 
            onChange={(e)=>setRegData({...regData, nome: e.target.value})} 
          />
          {/* Nuovo campo Cognome */}
          <input 
            type="text" 
            placeholder="Cognome" 
            value={regData.cognome}
            style={{...inputStyle, marginTop: '10px'}} 
            onChange={(e)=>setRegData({...regData, cognome: e.target.value})} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={regData.email}
            style={{...inputStyle, marginTop: '10px'}} 
            onChange={(e)=>setRegData({...regData, email: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={regData.password}
            style={{...inputStyle, marginTop: '10px'}} 
            onChange={(e)=>setRegData({...regData, password: e.target.value})} 
          />
          
          <button type="submit" style={regBtn}>Registrati</button>
        </form>
        <button onClick={onBackClick} style={{ background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', color: '#64748b' }}>
          Torna al Login
        </button>
      </div>
    </div>
  );
}

// STILI
const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'sans-serif' };
const loginCard = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box' };
const regBtn = { width: '100%', padding: '15px', background: '#1a237e', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px', transition: 'background 0.3s' };

export default Registrazione;