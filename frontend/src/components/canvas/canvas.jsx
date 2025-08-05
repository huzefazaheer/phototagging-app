import { useEffect, useRef, useState } from 'react'
import styles from './canvas.module.css'
import Selector from '../selector/selector'

export default function Canvas() {
  const divRef = useRef(null)
  const coordRef = useRef([0, 0])
  const normalizedRef = useRef([0, 0])
  const normalizedRadiusRef = useRef(0)
  const [selectedCoords, setSelectedCoords] = useState([0, 0])
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    async function getSession() {
      const res = await fetch(`http://localhost:8080/start`, {
        credentials: 'include',
      })
      console.log(await res.json())
    }
    getSession()
    const divSize = divRef.current.getBoundingClientRect()
    normalizedRadiusRef.current = 25 / Math.max(divSize.width, divSize.height)
  }, [])

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
          normalizedRef={normalizedRef}
          normalizedRadiusRef={normalizedRadiusRef}
        />
      </div>
    </>
  )
}
