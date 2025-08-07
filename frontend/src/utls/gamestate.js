import { use, useRef, useState } from 'react'
import Toast from '../components/toast/toast'

export default function useGameState() {
  const [gameFinished, setGameFinished] = useState(false)
  const [levelSelected, setLevelSelected] = useState(false)
  const timeElapsed = useRef(0)
  const [game, setGame] = useState(null)
  const [targets, setTargets] = useState({ 1: false, 2: false })
  const [toasts, setToasts] = useState([])
  const [objectives, setObjectives] = useState({})

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
    levelSelected,
    setLevelSelected,
    setGame,
    game,
    objectives,
    setObjectives,
  }
}
