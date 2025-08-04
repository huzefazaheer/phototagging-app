import { useRef, useState } from 'react'
import styles from './canvas.module.css'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])
  const [selectedCoords, setSelectedCoords] = useState([0, 0])

  function getCoords(e) {
    const divSize = divRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - divSize.left, e.clientY - divSize.top]
  }

  function getClick() {
    setSelectedCoords(coordRef.current)
  }

  return (
    <div
      className={styles.canvas}
      onMouseMove={(e) => getCoords(e)}
      onMouseDown={getClick}
      onContextMenu={(e) => e.preventDefault()}
      ref={divRef}
    >
      <Selector pos={selectedCoords} />
    </div>
  )
}

function Selector({ pos }) {
  return (
    <div className={styles.selector} style={{ left: pos[0], top: pos[1] }}>
      <img src="/selector.svg"></img>
    </div>
  )
}
