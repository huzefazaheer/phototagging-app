import { useContext, useEffect, useState } from 'react'
import { gameHandlerContext } from '../../App'
import styles from './winscreen.module.css'

export default function WinScreen() {
  const { timeElapsed, gameFinished } = useContext(gameHandlerContext)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getLeaderboard() {
      setLoading(true)
      const res = await fetch('http://localhost:8080/leaderboard/1')
      const data = await res.json()
      setLeaderboardData(data)
      setLoading(false)
    }
    getLeaderboard()
  }, [gameFinished])

  const leaderboard = !loading ? (
    leaderboardData.map((data) => {
      return (
        <tr>
          <td>{data.username}</td>
          <td>{data.timetaken} s</td>
        </tr>
      )
    })
  ) : (
    <p>Loading...</p>
  )

  return (
    <>
      <div className={styles.winscreen}>
        <div className={styles.left}>
          <h1>You won. </h1>
          <p>You have successfully found all the targets!</p>
          <h3 className={styles.timetaken}>
            Time taken: {timeElapsed.current} seconds
          </h3>
          <form action="/leaderboard">
            <div className={styles.input}>
              {' '}
              <label htmlFor="username">Enter display name</label>
              <input type="text" id="username" name="username" />
            </div>
            <button type="submit">Join Leaderboard</button>
          </form>
        </div>
        <div className={styles.right}>
          <h2>Leaderboard</h2>
          <h4>Map: Beach Party</h4>
          <table>
            <tr>
              <th>Username</th>
              <th>Time </th>
            </tr>
            {leaderboard}
          </table>
        </div>
      </div>
      <div className={styles.buttonholder}>
        <button>Play Again</button>
        <button>Choose another map</button>
      </div>
    </>
  )
}
