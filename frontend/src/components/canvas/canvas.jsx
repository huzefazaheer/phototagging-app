import { useRef, useState } from 'react'
import styles from './canvas.module.css'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])
  const [selectedCoords, setSelectedCoords] = useState([0, 0])
  const [showSelector, setShowSelector] = useState(false)

  function getCoords(e) {
    const divSize = divRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - divSize.left, e.clientY - divSize.top]
  }

  function getClick() {
    if (!showSelector) setShowSelector(true)
    setSelectedCoords(coordRef.current)
  }

  return (
    <>
      <div
        className={styles.canvas}
        onMouseMove={(e) => getCoords(e)}
        onMouseDown={getClick}
        onContextMenu={(e) => e.preventDefault()}
        ref={divRef}
      ></div>
      <Selector pos={selectedCoords} showSelector={showSelector} />
    </>
  )
}

function Selector({ pos, showSelector }) {
  return (
    <div
      id="selector"
      className={`${styles.selector} ${
        showSelector ? '' : styles.selectorhidden
      }`}
      style={{ left: pos[0], top: pos[1] }}
    >
      <img src="/selector.svg"></img>
      <DropdownMenu />
    </div>
  )
}

function DropdownMenu() {
  return (
    <ul onMouseDown={(e) => e.stopPropagation()} className={styles.dropdown}>
      <li>Select Item</li>
      <li>Jim</li>
      <li>Jimbo</li>
      <li>Close</li>
    </ul>
  )
}
