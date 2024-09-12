// import { useNodotsGame } from '../../../../Contexts/Game/useNodotsGame'
import {
  GamePlayingRolling,
  NodotsColor,
} from '../../../../../nodots_modules/backgammon-types'
import NodotsDiceSwitcherComponent from './NodotsDiceSwitcherComponent'

interface Props {
  color: NodotsColor
}

function NodotsDiceSwitcher({ color }: Props) {
  const { game, switchDice } = useNodotsGame()

  const switchDiceHandler = () => {
    switch (game?.kind) {
      case 'game-initializing':
      case 'game-initialized':
      case 'game-rolling-for-start':
      case 'game-playing-moving':
        break
      case 'game-playing-rolling':
        const _game = game as GamePlayingRolling
        switchDice(_game)
    }
  }

  switch (game?.kind) {
    case 'game-initializing':
    case 'game-initialized':
    case 'game-rolling-for-start':
    case 'game-playing-moving':
      return <></>
    case 'game-playing-rolling':
      return <NodotsDiceSwitcherComponent color={color} />
  }
}

export default NodotsDiceSwitcher
