import { useContext } from 'react'
import { gameHandlerContext } from '../../App'

export default function WinScreen() {
  const { timeElapsed } = useContext(gameHandlerContext)

  return (
    <>
      <h3>Game end, you won. </h3>
      <p>Time taken: {timeElapsed.current} seconds</p>
      <form action="/leaderboard">
        <h3>Leaderboard</h3>
        <label htmlFor="username">Enter your name</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Join Leaderboard</button>
      </form>
    </>
  )
}
