import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import AudioInterface from './components/audioInterface';

function App() {
  return( <AudioInterface/> )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
