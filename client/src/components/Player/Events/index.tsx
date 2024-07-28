import { observer } from 'mobx-react'
import HUDCard from '../../HUD/HUDCard'
import { NodotsGameStore } from '../../../stores/Game/Types'

interface Props {
  store: NodotsGameStore
}

function PlayerEventNotification({ store }: Props) {
  const buildMessage = () => {
    return 'buildMessage not implemented for PlayerEventNotification'
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
