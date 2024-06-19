import { Paper } from '@mui/material'
import { observer } from 'mobx-react'

import { useEffect, useState } from 'react'
import { NodotsGameState, generateId } from '../../stores/Game/Types'
import { gameStateKey } from '../../stores/Game/Stores/Move/helpers'

const parseHistoryEntry = (entry: NodotsGameState) => {
  const { plays } = entry
  switch (entry.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      break
    // move notifications are totally broken
    case 'game-playing':
      let { players, activeColor, moves } = entry
      let activePlayer = players[activeColor]
      const activeMove = moves.find((move) => !move.status)
      if (activeMove) {
        return <li key={generateId()}>{activePlayer.username} moves from </li>
      }
      break
    case 'game-completed':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} wins!
        </li>
      )
    default:

    //noop
  }
}

function GameHistory() {
  const [gameHistory, setGameHistory] = useState<NodotsGameState[]>([])
  function getGameHistory() {
    let gameHistoryString = localStorage.getItem(gameStateKey)
    if (!gameHistoryString) {
      gameHistoryString = '[]'
    }
    const gameHistory = JSON.parse(gameHistoryString)
    return gameHistory
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameHistory(getGameHistory())
    }, 1000) // 1000 milliseconds = 1 second
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array ensures this effect runs once on mount

  return (
    <Paper id="GameHistory" elevation={2}>
      <ul>{gameHistory.map((h) => parseHistoryEntry(h))}</ul>
    </Paper>
  )
}

export default observer(GameHistory)
