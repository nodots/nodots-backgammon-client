import { observer } from 'mobx-react'
import { NodotsGameState, Rolled, Rolling } from '../../../GameStore/types'
import { Card } from '@mui/material'
import HUDCard from '../../HUD/HUDCard'

interface Props {
  state: NodotsGameState
}

function DiceEventsNotification({ state }: Props) {
  const { players, kind } = state
  const buildMessage = () => {
    switch (kind) {
      case 'game-rolled':
      case 'game-rolling':
      case 'game-rolling-for-start':
        return kind
      case 'game-doubling':
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-initializing':
      case 'game-play-confirmed':
      default:
        return ''
    }
  }
  return <HUDCard eventSource="dice" message={buildMessage()} />
}

export default observer(DiceEventsNotification)
