import { observer } from 'mobx-react'
import { NodotsGameState } from '../../../../GameStore/types'
import HUDCard from '../../../HUD/HUDCard'

interface Props {
  gameState: NodotsGameState
}

function CubeEventsNotification({ state }: Props) {
  const { kind } = state
  const buildMessage = () => {
    switch (kind) {
      case 'game-doubled':
      case 'game-doubling':
      case 'game-rolling':
        return `[CubeEvent] ${kind} NOT IMPLEMENTED`
      case 'game-rolled':
      case 'game-rolling-for-start':
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-initializing':
      case 'game-play-confirmed':
        return `[CubeEvent2] ${kind} NOT IMPLEMENTED`
    }
  }
  return <HUDCard eventSource="cube" message={buildMessage()} />
}

export default observer(CubeEventsNotification)
