import { useContext, useEffect, useRef, useState } from 'react'
import styles from './canvas.module.css'
import Selector from '../selector/selector'
import { api } from '../../main'
import { gameHandlerContext } from '../../App'

export default function Canvas() {
  const canvasRef = useRef(null)
  const coordRef = useRef([0, 0])
  const normalizedRef = useRef([0, 0])
  const normalizedRadiusRef = useRef(0)
  const [selectedCoords, setSelectedCoords] = useState([0, 0])
  const [showSelector, setShowSelector] = useState(false)
  const game = useContext(gameHandlerContext)

  useEffect(() => {
    async function getSession() {
      canvasRef.current.style.backgroundImage =
        'url(http://localhost:8080/beach_party.webp)'
      const res = await fetch(`http://localhost:8080/start/${game.game}`, {
        credentials: 'include',
      })
      const data = await res.json()
      game.setObjectives(data.game.objectives)
    }
    getSession()
    const canvasSize = canvasRef.current.getBoundingClientRect()
    normalizedRadiusRef.current =
      25 / Math.max(canvasSize.width, canvasSize.height)
  }, [])

  function getCoords(e) {
    const canvasSize = canvasRef.current.getBoundingClientRect()
    coordRef.current = [e.clientX - canvasSize.left, e.clientY - canvasSize.top]
  }

  function getClick() {
    if (!showSelector) setShowSelector(true)
    setSelectedCoords(coordRef.current)
    const canvasSize = canvasRef.current.getBoundingClientRect()
    normalizedRef.current = [
      (2 * coordRef.current[0]) / canvasSize.width - 1,
      (2 * coordRef.current[1]) / canvasSize.height - 1,
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
          ref={canvasRef}
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
