import { useEffect, useRef, useState } from 'react'

export default function useGameState() {
  const [gameFinished, setGameFinished] = useState(false)
  const timeElapsed = useRef(0)
  const [targets, setTargets] = useState([])

  useEffect(() => {}, [targets])

  return { gameFinished, setGameFinished, timeElapsed, targets, setTargets }
}
