import React, { useState, useEffect } from 'react';

function Dashboard({ onBackClick, onLoginClick, onNavClick, userRole }) {
  const [stats, setStats] = useState({
    totalTeams: 0,
    scheduledMatches: 0,
    avgRating: 0,
    totalLeagues: 0,
    topTeams: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resPartite, resSquadre, resClassifiche] = await Promise.all([
          fetch('http://localhost:3000/api/partite'),
          fetch('http://localhost:3000/api/squadre'),
          fetch('http://localhost:3000/api/classifiche')
        ]);

        const partite = await resPartite.json();
        const squadre = await resSquadre.json();
        const classifiche = await resClassifiche.json();

        const avg = squadre.length > 0 
          ? Math.round(squadre.reduce((acc, s) => acc + s.punteggio_rating, 0) / squadre.length) 
          : 0;

        const uniqueLeagues = [...new Set(classifiche.map(item => item.id_lega))].length;
        const top3 = classifiche.slice(0, 3);

        setStats({
          totalTeams: squadre.length,
          scheduledMatches: partite.filter(p => p.stato === 'programmata').length,
          avgRating: avg,
          totalLeagues: uniqueLeagues,
          topTeams: top3
        });
        setLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento della dashboard:", error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavClick('dashboard')}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={btnSec}>Home</button>
          <button onClick={onLoginClick} style={btnPri}>Accedi</button>
        </div>
      </nav>

      <div style={subMenuStyle}>
        <span style={activeSubMenu}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
        
        {/* Tasto Admin visibile solo dopo Match Predictor se l'utente è admin */}
        {userRole === 'admin' && (
          <span onClick={() => onNavClick('gestione')} style={{...subMenuItem, color: '#fbc02d', fontWeight: 'bold', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px'}}>⚙️ Admin Panel</span>
        )}
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Dashboard Analytics</h2>
        {loading ? (
          <p>Sincronizzazione dati in corso...</p>
        ) : (
          <div style={statsGrid}>
             <div style={kpiCard}><p style={kpiLabel}>Squadre</p><h3 style={kpiValue}>{stats.totalTeams}</h3></div>
             <div style={kpiCard}><p style={kpiLabel}>Partite</p><h3 style={kpiValue}>{stats.scheduledMatches}</h3></div>
             <div style={kpiCard}><p style={kpiLabel}>Rating Medio</p><h3 style={kpiValue}>{stats.avgRating}</h3></div>
             <div style={kpiCard}><p style={kpiLabel}>Leghe</p><h3 style={kpiValue}>{stats.totalLeagues}</h3></div>
          </div>
        )}
      </div>
    </div>
  );
}

const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0', alignItems: 'center' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };
const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' };
const kpiCard = { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0' };
const kpiLabel = { margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem' };
const kpiValue = { margin: 0, fontSize: '1.8rem', color: '#1e293b' };
const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Dashboard;