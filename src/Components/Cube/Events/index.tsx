import { observer } from 'mobx-react'
import { NodotsGameState } from '../../../GameStore/types'
import { CubeEventHandler } from './handlers'
import NodotsGameStore from '../../../GameStore'
import HUDCard from '../../HUD/HUDCard'

interface Props {
  state: NodotsGameState
}

function CubeEventsNotification({ state }: Props) {
  const { players, kind } = state
  const buildMessage = () => {
    switch (kind) {
      case 'game-doubled':
      case 'game-doubling':
      case 'game-rolling':
        return kind
      case 'game-rolled':
      case 'game-rolling-for-start':
      case 'game-confirming-play':
      case 'game-moving':
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-initializing':
      case 'game-play-confirmed':
        return ''
    }
  }
  return <HUDCard eventSource="cube" message={buildMessage()} />
}

export default observer(CubeEventsNotification)
