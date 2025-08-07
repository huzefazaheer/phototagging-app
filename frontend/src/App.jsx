import { createContext, useEffect } from 'react'
import './App.css'
import Canvas from './components/canvas/canvas'
import Tasks from './components/tasks/tasks'
import WinScreen from './components/winscreen/winscreen'
import useGameState from './utls/gamestate'
import Toast from './components/toast/toast'
import GameSelector from './components/gameselectorscreen/gameselector'

// eslint-disable-next-line react-refresh/only-export-components
export const gameHandlerContext = createContext({
  gameFinished: null,
  setGameFinished: null,
  timeElapsed: null,
  targets: null,
  setTargets: null,
  addToast: null,
  toasts: null,
  setToasts: null,
  levelSelected: null,
  setLevelSelected: null,
  setGame: null,
  game: null,
})

function App() {
  const gameHandler = useGameState()

  const toasts = gameHandler.toasts.map((toast) => {
    return (
      <Toast
        id={toast.id}
        message={toast.message}
        status={toast.status}
        setToasts={gameHandler.setToasts}
      />
    )
  })

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
      <div className="toastholder">{toasts}</div>
    </>
  )
  return (
    <>
      <gameHandlerContext.Provider value={gameHandler}>
        {!gameHandler.levelSelected ? (
          <GameSelector />
        ) : gameHandler.gameFinished ? (
          <WinScreen />
        ) : (
          gameScreen
        )}
      </gameHandlerContext.Provider>
    </>
  )
}

export default App
