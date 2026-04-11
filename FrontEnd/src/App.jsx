import React from 'react'
import Login from './Login' // Colleghiamo il tuo file Login.jsx

function App() {
  return (
    <div className="App">
      {/* Invece di scrivere l'HTML qui, richiamiamo il componente Login.
          React andrà a leggere Login.jsx e lo "inietterà" qui dentro.
      */}
      <Login />
    </div>
  )
}

export default App