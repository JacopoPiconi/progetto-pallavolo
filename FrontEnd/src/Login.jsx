import React, { useState } from 'react';

function Login({ onBackClick, onGoToRegister }) {
  // Stato per i campi del form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Gestione errori semplice
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Impedisce il refresh della pagina
    setError('');

    // VALIDAZIONE: Controlla se i campi sono pieni
    if (!formData.email || !formData.password) {
      setError('Per favore, compila tutti i campi.');
      return;
    }

    // STRUTTURA PER IL BACKEND
    // Qui il backend riceverà un oggetto JSON con email e password
    console.log("Dati pronti per il database:", formData);
    
    // Esempio di chiamata API:
    // fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })
    
    alert("Tentativo di accesso inviato!");
  };

  return (
    <div style={containerStyle}>
      <button onClick={onBackClick} style={backFloatBtn}>← Torna Indietro</button>
      
      <div style={loginCard}>
        <h2 style={{ textAlign: 'center', color: '#1a237e', marginBottom: '20px' }}>Accedi</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>}
          
          <div style={inputGroup}>
            <label>Email</label>
            <input 
              name="email"
              type="email" 
              placeholder="latua@email.com" 
              style={inputStyle} 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={inputGroup}>
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              style={inputStyle} 
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={loginBtn}>Entra</button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
          Non hai un account?{' '}
          <span onClick={onGoToRegister} style={linkStyle}>Registrati qui</span>
        </p>
      </div>
    </div>
  );
}

// STILI
const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'sans-serif' };
const backFloatBtn = { position: 'absolute', top: '20px', left: '20px', padding: '12px 24px', borderRadius: '50px', border: 'none', backgroundColor: '#1a237e', color: 'white', fontWeight: 'bold', cursor: 'pointer' };
const loginCard = { background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px', textAlign: 'center' };
const inputGroup = { marginBottom: '15px', textAlign: 'left' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxSizing: 'border-box', marginTop: '5px' };
const loginBtn = { width: '100%', padding: '15px', background: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };
const linkStyle = { color: '#1a237e', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' };

export default Login;