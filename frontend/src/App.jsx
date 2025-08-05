import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Canvas from './components/canvas/canvas'
import Tasks from './components/tasks/tasks'
import WinScreen from './components/winscreen/winscreen'
import useGameState from './utls/gamestate'
import Toast from './components/toast/toast'

// eslint-disable-next-line react-refresh/only-export-components
export const gameHandlerContext = createContext({
  gameFinished: null,
  setGameFinished: null,
  timeElapsed: null,
  targets: null,
  setTargets: null,
  toggleToast: null,
})

function App() {
  const gameHandler = useGameState()

  const gameScreen = (
    <>
      <div className="mapinfo">
        <p>Map:</p>
        <h2>Beach Party</h2>
      </div>
      <Canvas />
      <div className="buttonholder">
        <button className="exitbutton">Exit</button>
        <button
          className="helpbutton"
          onClick={async () => {
            const res = await fetch(`http://localhost:8080/end`, {
              credentials: 'include',
            })
            const data = await res.json()
            if (data?.time) {
              gameHandler.timeElapsed.current = data.time
              gameHandler.setGameFinished(true)
            }
          }}
        >
          End
        </button>
      </div>
      <Tasks />
      <Toast showToast={gameHandler.showStausToast} />
    </>
  )
  return (
    <>
      <gameHandlerContext.Provider value={gameHandler}>
        {gameHandler.gameFinished ? <WinScreen /> : gameScreen}
      </gameHandlerContext.Provider>
    </>
  )
}

export default App
