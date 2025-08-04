import styles from './tasks.module.css'

export default function Tasks() {
  return (
    <div className={styles.tasks}>
      <h3>Current Game Tasks</h3>
      <div className={styles.task}>
        <img src="/character.png" alt="" />
        <h4>Find Jimbo</h4>
      </div>
      <div className={styles.task}>
        <img src="/character2.png" alt="" />
        <h4>Find Dog</h4>
      </div>
    </div>
  )
}
