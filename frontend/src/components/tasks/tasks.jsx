import styles from './tasks.module.css'

export default function Tasks() {
  return (
    <div className={styles.tasks}>
      <h3>Current Game Tasks</h3>
      <div className={styles.task}>
        <img src="/Character.Waldo.webp" alt="" />
        <h4>Find Waldo</h4>
      </div>
      <div className={styles.task}>
        <img src="/Character.Wenda.webp" alt="" />
        <h4>Find Wenda</h4>
      </div>
    </div>
  )
}
