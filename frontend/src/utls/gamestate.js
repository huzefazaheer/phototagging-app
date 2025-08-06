import { useEffect, useRef, useState } from 'react'
import Toast from '../components/toast/toast'

export default function useGameState() {
  const [gameFinished, setGameFinished] = useState(false)
  const timeElapsed = useRef(0)
  const [targets, setTargets] = useState([])
  const [toasts, setToasts] = useState([])

  function addToast(status, message) {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        status: status,
        message: message,
        id: crypto.randomUUID(),
      },
    ])
  }

  return {
    gameFinished,
    setGameFinished,
    timeElapsed,
    targets,
    setTargets,
    addToast,
    toasts,
    setToasts,
  }
}
