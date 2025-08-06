import { useEffect } from 'react'
import styles from './toast.module.css'

export default function Toast({ status, message, setToasts, id }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToasts((toasts) => {
        return toasts.filter((toast) => toast.id !== id)
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      id={id}
      key={id}
      className={`${styles.toast} ${
        status == 'error' ? styles.error : styles.success
      }`}
    >
      <p>{message}</p>
      <div className={styles.holder}>
        <div className={styles.loader}></div>
      </div>
    </div>
  )
}
