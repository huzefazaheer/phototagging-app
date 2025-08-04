import { useRef } from 'react'
import styles from './canvas.module.css'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])

  function getCoords(e) {
    const divSize = divRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - divSize.left, e.clientY - divSize.top]
  }

  function getClick() {
    console.log(coordRef.current)
  }

  return (
    <div
      className={styles.canvas}
      onMouseMove={(e) => getCoords(e)}
      onMouseDown={getClick}
      onContextMenu={(e) => e.preventDefault()}
      ref={divRef}
    ></div>
  )
}
