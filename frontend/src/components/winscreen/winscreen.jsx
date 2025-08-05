import { useContext } from 'react'
import { gameHandlerContext } from '../../App'
import styles from './winscreen.module.css'

export default function WinScreen() {
  const { timeElapsed } = useContext(gameHandlerContext)

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
          <h4>Map: The Beach</h4>
          <table>
            <tr>
              <th>Username</th>
              <th>Time </th>
            </tr>
            <tr>
              <td>Admin</td>
              <td>1.02 s</td>
            </tr>
            <tr>
              <td>Huzefa</td>
              <td>0.02 s</td>
            </tr>
            <tr>
              <td>Ibrahim</td>
              <td>5.02 s</td>
            </tr>
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
