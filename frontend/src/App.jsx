import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './components/canvas/canvas'
import Tasks from './components/tasks/tasks'

function App() {
  return (
    <>
      <Canvas />
      <div className="buttonholder">
        <button className="exitbutton">Exit</button>
        <button className="helpbutton">View Help</button>
      </div>
      <Tasks />
    </>
  )
}

export default App
