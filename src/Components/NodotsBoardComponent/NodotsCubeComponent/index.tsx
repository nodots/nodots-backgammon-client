import { NodotsGamePlayingRolling } from '../../../../nodots_modules/backgammon-types'
// import { useNodotsGame } from '../../../Contexts/Game/useNodotsGame'
import NodotsCubeComponent from './NodotsCubeComponent'

function NodotsCube() {
  const { game } = useNodotsGame()

  const clickHandler = () => {
    switch (game?.kind) {
      case 'playing-rolling':
        const _game = game as NodotsGamePlayingRolling
        console.log('double', _game)
        break
      case 'initializing':
      case 'game-initialized':
      case 'rolling-for-start':
      case 'playing-moving':
        break
    }
  }

  switch (game?.kind) {
    case 'initializing':
    case 'game-initialized':
    case 'rolling-for-start':
    case 'playing-moving':
      return <></>
    case 'playing-rolling':
      return <NodotsCubeComponent clickHandler={clickHandler} />
  }
}

export default NodotsCube
