import React, { useState, useEffect } from 'react';

function Dashboard({ onBackClick, onLoginClick, onNavClick }) {
  // Stati per memorizzare i dati dinamici dal Backend
  const [stats, setStats] = useState({
    totalTeams: 0,
    scheduledMatches: 0,
    avgRating: 0,
    totalLeagues: 0,
    topTeams: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funzione per recuperare tutti i dati necessari per la dashboard
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

        // Calcoliamo la media del rating
        const avg = squadre.length > 0 
          ? Math.round(squadre.reduce((acc, s) => acc + s.punteggio_rating, 0) / squadre.length) 
          : 0;

        // Troviamo le leghe uniche
        const uniqueLeagues = [...new Set(classifiche.map(item => item.id_lega))].length;

        // Prendiamo le prime 3 squadre ordinate per rating (già ordinate dal backend delle classifiche)
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
      {/* NAVBAR */}
      <nav style={navStyle}>
        <div style={{ cursor: 'pointer' }} onClick={() => onNavClick('dashboard')}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Volley<span style={{color: '#fbc02d'}}>Analytics</span></h2>
          <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Piattaforma enterprise di sport analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onBackClick} style={btnSec}>Home</button>
          <button onClick={onLoginClick} style={btnPri}>Accedi</button>
        </div>
      </nav>

      {/* SUB MENU */}
      <div style={subMenuStyle}>
        <span style={activeSubMenu}>Dashboard</span>
        <span onClick={() => onNavClick('calendario')} style={subMenuItem}>Calendario</span>
        <span onClick={() => onNavClick('classifiche')} style={subMenuItem}>Classifiche</span>
        <span onClick={() => onNavClick('giocatori')} style={subMenuItem}>Giocatori</span>
        <span onClick={() => onNavClick('matchpred')} style={subMenuItem}>Match Predictor</span>
      </div>

      <div style={{ padding: '30px 5%' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '20px' }}>Dashboard Analytics</h2>
        
        {loading ? (
          <p>Sincronizzazione dati in corso...</p>
        ) : (
          <>
            {/* GRIGLIA KPI DINAMICA */}
            <div style={statsGrid}>
               <div style={kpiCard}>
                 <p style={kpiLabel}>Squadre Monitorate</p>
                 <h3 style={kpiValue}>{stats.totalTeams}</h3>
               </div>
               <div style={kpiCard}>
                 <p style={kpiLabel}>Partite Programmate</p>
                 <h3 style={kpiValue}>{stats.scheduledMatches}</h3>
               </div>
               <div style={kpiCard}>
                 <p style={kpiLabel}>Rating Medio</p>
                 <h3 style={kpiValue}>{stats.avgRating}</h3>
               </div>
               <div style={kpiCard}>
                 <p style={kpiLabel}>Leghe Attive</p>
                 <h3 style={kpiValue}>{stats.totalLeagues}</h3>
               </div>
            </div>

            {/* TOP SQUADRE DINAMICA */}
            <div style={largeCard}>
               <h4 style={{marginTop: 0, color: '#1e293b'}}>Top Squadre per Rating</h4>
               {stats.topTeams.length > 0 ? (
                 stats.topTeams.map((s, i) => (
                   <div key={i} style={listItem}>
                     <span>{i+1}. {s.nome_squadra}</span> 
                     <b style={{color: '#1a237e'}}>{s.punteggio_rating}</b>
                   </div>
                 ))
               ) : (
                 <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>Nessun dato disponibile nel database.</p>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// STILI (Mantenuti e ottimizzati)
const containerStyle = { minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: 'sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', background: '#1a237e', color: 'white' };
const subMenuStyle = { display: 'flex', gap: '40px', padding: '15px 5%', background: 'white', borderBottom: '1px solid #e2e8f0' };
const subMenuItem = { color: '#64748b', cursor: 'pointer', fontWeight: '500' };
const activeSubMenu = { color: '#1e293b', fontWeight: 'bold', borderBottom: '2px solid #1a237e' };

const statsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', margin: '20px 0' };
const kpiCard = { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' };
const kpiLabel = { margin: '0 0 10px 0', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' };
const kpiValue = { margin: 0, fontSize: '1.8rem', color: '#1e293b' };

const largeCard = { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0' };
const listItem = { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f1f5f9' };

const btnPri = { padding: '8px 25px', backgroundColor: '#fbc02d', color: '#1a237e', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' };
const btnSec = { padding: '8px 25px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '50px', cursor: 'pointer' };

export default Dashboard;