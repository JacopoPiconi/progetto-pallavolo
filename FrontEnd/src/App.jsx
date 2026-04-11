import React, { useState } from 'react'
import Home from './Home'  // Collega il nuovo file
import Login from './Login' // Collega il file creato prima

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <Home onLoginClick={() => setCurrentPage('login')} />
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Tasto per tornare indietro dal Login alla Home */}
          <button 
            onClick={() => setCurrentPage('home')} 
            style={{ position: 'absolute', top: '20px', left: '20px', padding: '10px', cursor: 'pointer', zIndex: 10 }}
          >
            ← Torna alla Home
          </button>
          <Login />
        </div>
      )}
    </div>
  )
}

export default App