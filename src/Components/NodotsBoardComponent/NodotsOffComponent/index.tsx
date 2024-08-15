import useNodotsGame from '../../../Hooks/GameHook'
import NodotsOffComponent from './NodotsOffComponent'

function NodotsOff() {
  const { game } = useNodotsGame()

  switch (game?.kind) {
    case 'game-initializing':
      return <></>
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-rolling':
    case 'game-playing-moving':
      return <NodotsOffComponent />
  }
}

export default NodotsOff
