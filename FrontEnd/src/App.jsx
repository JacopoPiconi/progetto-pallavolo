import React, { useState } from 'react';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Calendario from './Calendario';
import Classifiche from './Classifiche';
import Giocatori from './Giocatori';
import MatchPred from './MatchPred';
import Registrazione from './Registrazione';
import GestioneContenuti from './GestioneContenuti';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lastViewedTab, setLastViewedTab] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState('home');
  
  // Stato utente: se null è un tifoso visitatore
  const [user, setUser] = useState(null); 

  const navigateTo = (page) => {
    if (['dashboard', 'calendario', 'classifiche', 'giocatori', 'matchpred'].includes(page)) {
      setLastViewedTab(page);
    }
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Se l'admin accede, va subito alla gestione, altrimenti alla dashboard
    if (userData.ruolo === 'admin') {
      setCurrentPage('gestione');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home onLoginClick={() => navigateTo('login')} onExploreClick={() => navigateTo(lastViewedTab)} />
      )}
      
      {currentPage === 'login' && (
        <Login 
          onBackClick={() => setCurrentPage(previousPage)} 
          onGoToRegister={() => setCurrentPage('registrazione')}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {currentPage === 'registrazione' && (
        <Registrazione onBackClick={() => setCurrentPage('login')} />
      )}

      {/* Pannello Admin: visibile SOLO se il ruolo è admin */}
      {currentPage === 'gestione' && user?.ruolo === 'admin' && (
        <GestioneContenuti 
          userRole={user.ruolo} 
          onBackClick={handleLogout} 
          onNavClick={navigateTo} 
        />
      )}

      {/* Pagine standard: passiamo userRole per mostrare/nascondere il tasto gestione */}
      {currentPage === 'dashboard' && <Dashboard onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} userRole={user?.ruolo} />}
      {currentPage === 'calendario' && <Calendario onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} userRole={user?.ruolo} />}
      {currentPage === 'classifiche' && <Classifiche onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} userRole={user?.ruolo} />}
      {currentPage === 'giocatori' && <Giocatori onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} userRole={user?.ruolo} />}
      {currentPage === 'matchpred' && <MatchPred onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} userRole={user?.ruolo} />}
    </div>
  );
}

export default App;