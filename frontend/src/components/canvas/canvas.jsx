import { useRef, useState } from 'react'
import styles from './canvas.module.css'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])
  const normalizedRef = useRef([0, 0])
  const [selectedCoords, setSelectedCoords] = useState([0, 0])
  const [showSelector, setShowSelector] = useState(false)

  function getCoords(e) {
    const divSize = divRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - divSize.left, e.clientY - divSize.top]
  }

  function getClick() {
    if (!showSelector) setShowSelector(true)
    setSelectedCoords(coordRef.current)
    const divSize = divRef.current.getBoundingClientRect()
    normalizedRef.current = [
      (2 * coordRef.current[0]) / divSize.width - 1,
      (2 * coordRef.current[1]) / divSize.height - 1,
    ]
    console.log(normalizedRef.current)
  }

  return (
    <>
      <div
        className={styles.gameholder}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className={styles.canvas}
          onMouseMove={(e) => getCoords(e)}
          onMouseDown={getClick}
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
      <li>Jimbo</li>
      <li>Dog</li>
      <li onClick={() => setShowSelector(false)}>Close</li>
    </ul>
  )
}
