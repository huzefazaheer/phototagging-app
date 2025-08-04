import { useRef, useState } from 'react'
import styles from './canvas.module.css'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])
  const [selectedCoords, setSelectedCoords] = useState([0, 0])
  const [showSelector, setShowSelector] = useState(true)

  function getCoords(e) {
    const divSize = divRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - divSize.left, e.clientY - divSize.top]
    console.log(coordRef.current)
  }

  function getClick() {
    if (!showSelector) setShowSelector(true)
    setSelectedCoords(coordRef.current)
  }

  return (
    <>
      <div className={styles.gameholder}>
        <div
          className={styles.canvas}
          onMouseMove={(e) => getCoords(e)}
          onMouseDown={getClick}
          onContextMenu={(e) => e.preventDefault()}
          ref={divRef}
        ></div>
        <Selector
          pos={selectedCoords}
          showSelector={showSelector}
          setShowSelector={setShowSelector}
        />
      </div>
    </>
  )
}

function Selector({ pos, showSelector, setShowSelector }) {
  return (
    <div
      id="selector"
      className={`${styles.selector} ${
        showSelector ? '' : styles.selectorhidden
      }`}
      style={{ left: pos[0] - 8, top: pos[1] - 8 }}
    >
      <img src="/selector.svg"></img>
      <DropdownMenu setShowSelector={setShowSelector} />
    </div>
  )
}

function DropdownMenu({ setShowSelector }) {
  return (
    <ul onMouseDown={(e) => e.stopPropagation()} className={styles.dropdown}>
      <li>Select Item</li>
      <li>Jim</li>
      <li>Jimbo</li>
      <li onClick={() => setShowSelector(false)}>Close</li>
    </ul>
  )
}
