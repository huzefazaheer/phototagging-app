import { useEffect, useRef, useState } from 'react'

export default function useGameState() {
  const [gameFinished, setGameFinished] = useState(false)
  const timeElapsed = useRef(0)
  const [targets, setTargets] = useState([])
  const [showStausToast, setShowStatusToast] = useState(false)

  useEffect(() => {}, [targets])

  function toggleToast() {
    setShowStatusToast(true)
    setTimeout(() => {
      setShowStatusToast(false)
    }, 1000)
  }

  return {
    gameFinished,
    setGameFinished,
    timeElapsed,
    targets,
    setTargets,
    toggleToast,
    showStausToast,
  }
}
