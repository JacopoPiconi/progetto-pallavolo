import React, { useState } from 'react';
import './Login.css';

function Login() {
  // Stati per gestire se siamo in login o registrazione
  const [isLogin, setIsLogin] = useState(true);
  
  // Stati per catturare i dati del form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui andrà la chiamata al backend di Jacopo e Yashpreet
    console.log("Dati inviati:", { email, password, nome, tipo: isLogin ? 'LOGIN' : 'SIGNUP' });
    alert(`Tentativo di ${isLogin ? 'Accesso' : 'Registrazione'} per: ${email}`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isLogin ? 'Accedi a VolleyAnalytics' : 'Registrati'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Inserisci il tuo nome" 
                required 
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="esempio@volley.it" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="btn-login">
            {isLogin ? 'ENTRA' : 'CREA ACCOUNT'}
          </button>
        </form>

        <p className="switch-auth">
          {isLogin ? "Non hai un account? " : "Hai già un account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registrati qui" : "Accedi qui"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;