import { observer } from 'mobx-react-lite'
import { NodotsBoardComponent } from '../../Components/NodotsBoardComponent/NodotsBoardComponent'
import NodotsGameNotifications from '../../Components/NodotsNotificationsComponent/GameNotifications'
import { useGameContext } from '../../Contexts/Game/GameContext'
import { useEffect } from 'react'
import { getGameById } from '../../Contexts/Game/gameHelpers'
import { uuidFromUrl } from '../../helpers'

const GamePage = () => {
  const { game, setGame, player } = useGameContext()
  const gameId =
    sessionStorage.getItem('gameId') || uuidFromUrl(window.location.href)

  useEffect(() => {
    getGameById(gameId).then((g) => {
      setGame(g)
    })
  }, [game, gameId])

  return (
    <div id="GameContainer">
      <NodotsGameNotifications />
      <NodotsBoardComponent />
    </div>
  )
}

export default observer(GamePage)
