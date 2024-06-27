import { observer } from 'mobx-react'
import { NodotsGameState } from '../../../../GameStore/types'
import HUDCard from '../../../HUD/HUDCard'

interface Props {
  gameState: NodotsGameState
}

function CheckerEventsNotification({ state }: Props) {
  const { kind } = state
  const buildMessage = () => {
    switch (kind) {
      case 'game-confirming-play':
      case 'game-moving':
        return kind
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-initializing':
      case 'game-play-confirmed':
      case 'game-rolled':
      case 'game-rolling':
      case 'game-rolling-for-start':
      default:
        return ''
    }
  }
  return <HUDCard eventSource="checker" message={buildMessage()} />
}

export default observer(CheckerEventsNotification)
