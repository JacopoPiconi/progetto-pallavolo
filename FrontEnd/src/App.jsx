import React, { useState } from 'react';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Calendario from './Calendario';
import Classifiche from './Classifiche';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home 
          onLoginClick={() => setCurrentPage('login')} 
          onExploreClick={() => setCurrentPage('dashboard')} 
        />
      )}
      
      {currentPage === 'login' && (
        <div style={{ position: 'relative' }}>
          <button onClick={() => setCurrentPage('home')} style={backFloatBtn}>← Home</button>
          <Login />
        </div>
      )}

      {currentPage === 'dashboard' && (
        <Dashboard 
          onBackClick={() => setCurrentPage('home')} 
          onLoginClick={() => setCurrentPage('login')}
          onNavClick={(page) => setCurrentPage(page)}
        />
      )}

      {currentPage === 'calendario' && (
        <Calendario 
          onBackClick={() => setCurrentPage('home')} 
          onLoginClick={() => setCurrentPage('login')}
          onNavClick={(page) => setCurrentPage(page)}
        />
      )}

      {currentPage === 'classifiche' && (
        <Classifiche 
          onBackClick={() => setCurrentPage('home')} 
          onLoginClick={() => setCurrentPage('login')}
          onNavClick={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

const backFloatBtn = {
  position: 'absolute', top: '20px', left: '20px', padding: '12px 24px', 
  borderRadius: '50px', border: 'none', backgroundColor: '#1a237e', color: 'white',
  fontWeight: 'bold', cursor: 'pointer', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
};

export default App;