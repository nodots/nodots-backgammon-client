import { observer } from 'mobx-react-lite'
import { NodotsBoardComponent } from '../../Components/NodotsBoardComponent/NodotsBoardComponent'
import NodotsGameNotifications from '../../Components/NodotsNotificationsComponent/GameNotifications'
import { useGameContext } from '../../Contexts/Game/GameContext'
import { useEffect } from 'react'
import { getGameById } from '../../Contexts/Game/gameHelpers'

export const uuidFromUrl = (url: string): string => {
  const urlPieces = url.split('/')
  return urlPieces[urlPieces.length - 1]
}

const GamePage = () => {
  const { game, setGame, player } = useGameContext()
  const gameId =
    sessionStorage.getItem('gameId') || uuidFromUrl(window.location.href)

  useEffect(() => {
    sessionStorage.setItem('gameId', gameId)
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
