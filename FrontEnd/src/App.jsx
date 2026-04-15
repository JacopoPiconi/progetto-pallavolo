import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  // Stato per gestire la navigazione: 'home', 'login', 'dashboard'
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {/* Visualizzazione condizionale delle pagine */}
      
      {currentPage === 'home' && (
        <Home 
          onLoginClick={() => setCurrentPage('login')} 
          onExploreClick={() => setCurrentPage('dashboard')} 
        />
      )}
      
      {currentPage === 'login' && (
        <div style={{ position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={backFloatBtn}>
            ← Torna alla Home
          </button>
          <Login />
        </div>
      )}
      {currentPage === 'dashboard' && (
      <Dashboard 
        onBackClick={() => setCurrentPage('home')} 
        onLoginClick={() => setCurrentPage('login')} // Aggiungi questa riga
        />
      )}
    </div>
  )
}

// Stile per il tasto "Torna indietro" nel Login
const backFloatBtn = {
  position: 'absolute', 
  top: '20px', 
  left: '20px', 
  padding: '12px 24px', 
  borderRadius: '50px', 
  border: 'none', 
  backgroundColor: '#1a237e', 
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer', 
  zIndex: 10,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
};

export default App