import React from 'react'

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
      <nav style={{ background: '#1a237e', padding: '1rem', color: 'white' }}>
        <h2>VolleyAnalytics</h2>
      </nav>
      
      <main style={{ padding: '2rem' }}>
        <h1>Benvenuto, Jacopo!</h1>
        <p>Inizia a monitorare le statistiche della lega.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <button style={btnStyle}>Vedi Classifiche</button>
          <button style={btnStyle}>Match Predictor 🏐</button>
        </div>
      </main>
    </div>
  )
}

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#fbc02d',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
}

export default App