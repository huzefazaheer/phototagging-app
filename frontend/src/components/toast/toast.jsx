import styles from './toast.module.css'

export default function Toast({ showToast }) {
  return (
    <div className={`${styles.toast} ${showToast ? '' : styles.hidden}`}>
      <p>Found target</p>
    </div>
  )
}
