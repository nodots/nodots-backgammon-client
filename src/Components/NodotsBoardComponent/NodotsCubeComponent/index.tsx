import { GamePlayingRolling } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import NodotsCubeComponent from './NodotsCubeComponent'

function NodotsCube() {
  const { game } = useNodotsGame()

  const clickHandler = () => {
    switch (game?.kind) {
      case 'game-playing-rolling':
        const _game = game as GamePlayingRolling
        console.log('double', _game)
        break
      case 'game-initializing':
      case 'game-initialized':
      case 'game-rolling-for-start':
      case 'game-playing-moving':
        break
    }
  }

  switch (game?.kind) {
    case 'game-initializing':
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-moving':
      return <></>
    case 'game-playing-rolling':
      return <NodotsCubeComponent clickHandler={clickHandler} />
  }
}

export default NodotsCube
