import { observer } from 'mobx-react-lite'
import { NodotsBoardComponent } from '../../Components/NodotsBoardComponent/NodotsBoardComponent'
import { Loading } from '../../Components/utils/Loading'
import { useGameContext } from '../../Contexts/Game/useGameContext'
import NodotsGameNotifications from '../../Components/NodotsNotificationsComponent/GameNotifications'

export const uuidFromUrl = (url: string): string => {
  const urlPieces = url.split('/')
  return urlPieces[urlPieces.length - 1]
}

const GamePage = () => {
  const { game, player } = useGameContext()

  switch (game?.kind) {
    case 'initializing':
      return <Loading message="GamePage loading game" />
    default:
      return (
        <div id="GameContainer">
          <NodotsGameNotifications />
          <NodotsBoardComponent />
        </div>
      )
  }
}

export default observer(GamePage)
