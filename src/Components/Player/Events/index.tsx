import { observer } from 'mobx-react'
import { NodotsGameState } from '../../../GameStore/types'
import HUDCard from '../../HUD/HUDCard'
import { useTheme } from '@mui/material'
import MoveTable from './MoveTable'

interface Props {
  state: NodotsGameState
}

function PlayerEventNotification({ state }: Props) {
  const theme = useTheme()
  const { kind } = state

  const buildMessage = () => {
    switch (kind) {
      case 'game-confirming-play':
      case 'game-play-confirmed':
      case 'game-moving':
      case 'game-completed':
      case 'game-dice-switched':
      case 'game-rolled':
      case 'game-play-confirmed':
        return <MoveTable moves={state.moves ? state.moves : []} />
      case 'game-doubling':
      case 'game-doubled':
      case 'game-initializing':
      case 'game-rolling':
      case 'game-rolling-for-start':
        return <p>Roll dice to initialize game</p>
      default:
        console.warn(`[PlayerEventNotification]: unknown state ${kind}`)
        break
    }
  }

  return (
    <HUDCard
      title="Move History"
      eventSource="player"
      message={buildMessage()}
      className="hud-card scrollable"
    />
  )
}

export default observer(PlayerEventNotification)
