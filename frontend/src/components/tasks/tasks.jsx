import { useContext } from 'react'
import styles from './tasks.module.css'
import { gameHandlerContext } from '../../App'

export default function Tasks() {
  const { targets } = useContext(gameHandlerContext)

  return (
    <div className={styles.tasks}>
      <h3>Current Game Tasks</h3>
      <div className={`${styles.task} ${targets[1] ? styles.done : ''}`}>
        <img src="/Character.Waldo.webp" alt="" />
        <h4>Find Waldo</h4>
      </div>
      <div className={`${styles.task} ${targets[2] ? styles.done : ''}`}>
        <img src="/Character.Wenda.webp" alt="" />
        <h4>Find Wenda</h4>
      </div>
    </div>
  )
}
