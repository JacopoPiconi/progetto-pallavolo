import React, { useState } from 'react';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Calendario from './Calendario';
import Classifiche from './Classifiche';
import Giocatori from './Giocatori';
import MatchPred from './MatchPred';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lastViewedTab, setLastViewedTab] = useState('dashboard');
  const [previousPage, setPreviousPage] = useState('home');

  const navigateTo = (page) => {
    if (['dashboard', 'calendario', 'classifiche', 'giocatori', 'matchpred'].includes(page)) {
      setLastViewedTab(page);
    }
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home onLoginClick={() => navigateTo('login')} onExploreClick={() => navigateTo(lastViewedTab)} />
      )}
      
      {currentPage === 'login' && (
        <Login onBackClick={() => setCurrentPage(previousPage)} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} />
      )}

      {currentPage === 'calendario' && (
        <Calendario onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} />
      )}

      {currentPage === 'classifiche' && (
        <Classifiche onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} />
      )}

      {currentPage === 'giocatori' && (
        <Giocatori onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} />
      )}

      {currentPage === 'matchpred' && (
        <MatchPred onBackClick={() => navigateTo('home')} onLoginClick={() => navigateTo('login')} onNavClick={navigateTo} />
      )}
    </div>
  );
}

export default App;