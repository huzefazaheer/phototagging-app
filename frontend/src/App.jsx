import { useRef, useState } from 'react'
import './App.css'
import Canvas from './components/canvas/canvas'
import Tasks from './components/tasks/tasks'

function App() {
  const [gameEnded, setgameEnded] = useState(false)
  const timeRef = useRef(0)
  const gameScreen = (
    <>
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
              timeRef.current = data.time
              setgameEnded(true)
            }
          }}
        >
          End
        </button>
      </div>
      <Tasks />
    </>
  )
  const winScreen = (
    <>
      <h3>Game end, you won. </h3>
      <p>Time taken: {timeRef.current} seconds</p>
      <form action="/leaderboard">
        <h3>Leaderboard</h3>
        <label htmlFor="username">Enter your name</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Join Leaderboard</button>
      </form>
    </>
  )
  return <>{gameEnded ? winScreen : gameScreen}</>
}

export default App
