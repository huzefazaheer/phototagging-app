import { useContext, useEffect, useState } from 'react'
import { gameHandlerContext } from '../../App'
import { api } from '../../main'

import styles from './styles.module.css'

export default function GameSelector() {
  const game = useContext(gameHandlerContext)

  const [gamesData, setGamesData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getGames() {
      setLoading(true)
      const res = await fetch(api + '/games')
      const data = await res.json()
      setGamesData(data)
      setLoading(false)
    }
    getGames()
  }, [])

  const games = !loading ? (
    gamesData.map((data) => {
      return (
        <Level
          setLevelSelected={game.setLevelSelected}
          setGame={game.setGame}
          name={data.name}
          id={data.id}
          levelimg={data.levelimg}
        ></Level>
      )
    })
  ) : (
    <p>Loading...</p>
  )

  return (
    <>
      <h1>Photo Tagger</h1>
      <div className={styles.levels}>{games}</div>
    </>
  )
}

function Level({ setLevelSelected, setGame, name, id, levelimg }) {
  return (
    <div className={styles.level}>
      <h4>{name}</h4>
      <img src={api + '/' + levelimg} alt="" className={styles.img} />
      <button
        onClick={() => {
          setLevelSelected(true)
          setGame(id)
        }}
      >
        Play
      </button>
    </div>
  )
}
