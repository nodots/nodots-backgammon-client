import { observer } from 'mobx-react'
import { NodotsGameState } from '../../stores/Game/Types'

interface Props {
  gameState: NodotsGameState
}
function ActiveColor({ gameState }: Props) {
  switch (gameState.kind) {
    case 'game-initializing':
    case 'game-rolling-for-start':
    case 'game-completed':
      return <></>
    case 'game-playing-moving':
    case 'game-playing-rolling':
      return <strong>{gameState.activeColor}</strong>
    default:
      console.error(
        '[Component: ActiveColor] unexpected game state:',
        gameState.kind
      )
      return <></>
  }
}

export default observer(ActiveColor)
