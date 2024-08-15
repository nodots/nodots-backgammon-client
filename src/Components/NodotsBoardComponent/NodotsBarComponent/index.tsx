import useNodotsGame from '../../../Hooks/GameHook'
import { NodotsBarComponent } from './NodotsBarComponent'

function NodotsBar() {
  const { game } = useNodotsGame()

  switch (game?.kind) {
    case 'game-initializing':
      return <></>
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-rolling':
    case 'game-playing-moving':
      return <NodotsBarComponent />
  }
}

export default NodotsBar
