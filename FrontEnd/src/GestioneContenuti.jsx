import React from 'react';

function GestioneContenuti({ onBackClick, onNavClick, userRole }) {
  return (
    <div style={adminBody}>
      {/* SIDEBAR - Elegante e Professionale */}
      <aside style={sidebarStyle}>
        <div style={logoWrapper}>
          <div style={logoSquare}>VA</div>
        </div>
        
        <nav style={navIconsGroup}>
          {/* MODIFICA: Questo tasto ora permette di tornare a vedere il sito pubblico */}
          <div 
            style={sideIconActive} 
            onClick={() => onNavClick('dashboard')} 
            title="Torna al Sito Pubblico"
          >
            🏠
            <span style={{fontSize: '0.6rem', display: 'block', marginTop: '2px'}}>SITO</span>
          </div>

          <div style={sideIcon} title="Statistiche">📊</div>
          <div style={sideIcon} title="Impostazioni">⚙️</div>
          <div style={sideIcon} title="Database">🗄️</div>
        </nav>
        
        {/* TASTO ESCI - Logout completo */}
        <div style={logoutBtn} onClick={onBackClick} title="Logout">
          <div style={{fontSize: '1.2rem', marginBottom: '2px'}}>🚪</div>
          <span style={{fontSize: '0.7rem', fontWeight: 'bold'}}>ESCI</span>
        </div>
      </aside>

      {/* CONTENUTO PRINCIPALE */}
      <main style={mainContent}>
        {/* TOP BAR */}
        <header style={topBar}>
          <div>
            <h1 style={mainTitle}>Pannello di Controllo</h1>
            <p style={subTitle}>Monitoraggio infrastruttura VolleyAnalytics</p>
          </div>
          
          <div style={adminBadge}>
            <div style={onlineDot}></div>
            <span style={adminName}>Amministratore</span>
            <div style={miniAvatar}>A</div>
          </div>
        </header>

        {/* CARDS STATISTICHE */}
        <div style={statsWrapper}>
          <div style={infoCard}>
            <span style={label}>Utenti Online</span>
            <h2 style={val}>24</h2>
            <div style={trendUp}>↑ 4.5% oggi</div>
          </div>
          <div style={infoCard}>
            <span style={label}>Partite Gestite</span>
            <h2 style={val}>452</h2>
            <div style={trendFlat}>Sistema allineato</div>
          </div>
          <div style={infoCard}>
            <span style={label}>Latenza API</span>
            <h2 style={val}>18ms</h2>
            <div style={trendDown}>↓ 2% (ottimale)</div>
          </div>
        </div>

        {/* TABELLA ATTIVITÀ DATABASE */}
        <div style={tableContainer}>
          <div style={tableHeader}>
            <h3 style={{margin: 0, color: '#111827'}}>Log Aggiornamenti Database</h3>
            <button style={refreshBtn}>Aggiorna Dati</button>
          </div>
          
          <table style={customTable}>
            <thead>
              <tr style={thRow}>
                <th style={th}>ID SQUADRA</th>
                <th style={th}>OPERAZIONE</th>
                <th style={th}>ORARIO</th>
                <th style={th}>STATO</th>
              </tr>
            </thead>
            <tbody>
              <tr style={tdRow}>
                <td style={td}>#PERUGIA_01</td>
                <td style={td}>Aggiornamento Rating</td>
                <td style={td}>22:45:10</td>
                <td style={td}><span style={statusOk}>Completato</span></td>
              </tr>
              <tr style={tdRow}>
                <td style={td}>#TRENTO_02</td>
                <td style={td}>Inserimento Match</td>
                <td style={td}>22:48:30</td>
                <td style={td}><span style={statusWait}>In coda</span></td>
              </tr>
              <tr style={tdRow}>
                <td style={td}>#MODENA_05</td>
                <td style={td}>Sync Giocatori</td>
                <td style={td}>22:50:12</td>
                <td style={td}><span style={statusOk}>Completato</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// --- STILI CSS-IN-JS ---

const adminBody = { display: 'flex', height: '100vh', backgroundColor: '#f4f7fa', fontFamily: '"Inter", sans-serif', color: '#1e293b' };

const sidebarStyle = { width: '80px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0' };
const logoWrapper = { marginBottom: '45px' };
const logoSquare = { width: '45px', height: '45px', backgroundColor: '#1a237e', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' };

const navIconsGroup = { flex: 1, display: 'flex', flexDirection: 'column', gap: '35px', alignItems: 'center' };
const sideIcon = { fontSize: '1.4rem', cursor: 'pointer', opacity: 0.3, transition: '0.2s', textAlign: 'center' };
const sideIconActive = { ...sideIcon, opacity: 1, color: '#1a237e' };

const logoutBtn = { cursor: 'pointer', textAlign: 'center', marginBottom: '10px', color: '#ef4444', opacity: 0.8 };

const mainContent = { flex: 1, padding: '40px 60px', overflowY: 'auto' };
const topBar = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' };
const mainTitle = { margin: 0, fontSize: '1.8rem', fontWeight: '800' };
const subTitle = { margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' };

const adminBadge = { display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '10px 18px', borderRadius: '100px', border: '1px solid #e2e8f0' };
const onlineDot = { width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' };
const adminName = { fontSize: '0.9rem', fontWeight: '600' };
const miniAvatar = { width: '30px', height: '30px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#1a237e', fontWeight: 'bold' };

const statsWrapper = { display: 'flex', gap: '30px', marginBottom: '40px' };
const infoCard = { flex: 1, background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #eef2f6' };
const label = { fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' };
const val = { fontSize: '2.4rem', margin: '10px 0', fontWeight: '800' };
const trendUp = { color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' };
const trendDown = { color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' };
const trendFlat = { color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' };

const tableContainer = { background: 'white', padding: '35px', borderRadius: '28px', border: '1px solid #eef2f6' };
const tableHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const refreshBtn = { padding: '10px 22px', background: '#1a237e', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' };

const customTable = { width: '100%', borderCollapse: 'collapse' };
const thRow = { textAlign: 'left', borderBottom: '2px solid #f1f5f9' };
const th = { padding: '15px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' };
const tdRow = { borderBottom: '1px solid #f8fafc' };
const td = { padding: '22px 15px', fontSize: '0.95rem' };

const statusOk = { background: '#dcfce7', color: '#166534', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' };
const statusWait = { background: '#fef3c7', color: '#92400e', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' };

export default GestioneContenuti;