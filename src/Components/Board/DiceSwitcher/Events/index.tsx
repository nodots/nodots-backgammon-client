import { observer } from 'mobx-react'
import { NodotsGameState } from '../../../../GameStore/types'
import HUDCard from '../../../HUD/HUDCard'

interface Props {
  gameState: NodotsGameState
}

function DiceSwitcherEventsNotification({ state }: Props) {
  const { kind } = state
  const buildMessage = () => {
    switch (kind) {
      case 'game-dice-switched':
        return kind
      case 'game-rolled':
      case 'game-rolling':
      case 'game-rolling-for-start':
      case 'game-doubling':
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-completed':
      case 'game-initializing':
      case 'game-play-confirmed':
      case 'game-doubled':
      default:
        return ''
    }
  }
  return <HUDCard eventSource="dice switcher" message={buildMessage()} />
}

export default observer(DiceSwitcherEventsNotification)
