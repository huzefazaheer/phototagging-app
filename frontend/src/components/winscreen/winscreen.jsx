import { useContext, useEffect, useState } from 'react'
import { gameHandlerContext } from '../../App'
import styles from './winscreen.module.css'
import { api } from '../../main'

export default function WinScreen() {
  const { timeElapsed, gameFinished } = useContext(gameHandlerContext)
  const [username, setUsername] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function getLeaderboard() {
      setLoading(true)
      const res = await fetch(api + '/leaderboard/1')
      const data = await res.json()
      setLeaderboardData(data)
      setLoading(false)
    }
    getLeaderboard()
  }, [update])

  async function postLeaderboardData() {
    setLoading(true)
    const res = await fetch(api + 'leaderboard/1', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ username }),
    })
    setLoading(false)
  }

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
          <form>
            <div className={styles.input}>
              {' '}
              <label htmlFor="username">Enter display name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                postLeaderboardData()
                if (!loading) {
                  setUpdate((update) => !update)
                }
              }}
            >
              Join Leaderboard
            </button>
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
        <a href="/">Play Again</a>
      </div>
    </>
  )
}
