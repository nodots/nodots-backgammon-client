import { Paper } from '@mui/material'
import { observer } from 'mobx-react'
import { gameStateKey } from '../../../GameStore/types/move/helpers'
import { NodotsGameState, generateId } from '../../../GameStore/types'
import { useEffect, useState } from 'react'
import { moveSyntheticComments } from 'typescript'
import { move } from '../../../GameStore/types/move'
import { Point } from '../../../GameStore/types/Checkercontainer'

const parseHistoryEntry = (entry: NodotsGameState) => {
  switch (entry.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
      break
    // move notifications are totally broken
    case 'game-moving':
      let { players, activeColor, moves } = entry
      let activePlayer = players[activeColor]
      const activeMove = moves.find((move) => !move.completed)
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
    case 'game-confirming-play':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} confirming play
        </li>
      )
    case 'game-play-confirmed':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} confirmed
        </li>
      )
    case 'game-rolling':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} rolling
        </li>
      )
    case 'game-rolled':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} rolled {entry.roll[0]}:
          {entry.roll[1]}
        </li>
      )
    case 'game-dice-switched':
      return (
        <li key={generateId()}>
          {entry.players[entry.activeColor].username} switched dice{' '}
          {entry.roll[0]}:{entry.roll[1]}
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
    <Paper id="MoveHistoryContainer" elevation={2}>
      <ul>{gameHistory.map((h) => parseHistoryEntry(h))}</ul>
    </Paper>
  )
}

export default observer(GameHistory)
