// import { useNodotsGame } from '../../../../Contexts/Game/useNodotsGame'
import {
  NodotsGamePlayingRolling,
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
      case 'initializing':
      case 'game-initialized':
      case 'rolling-for-start':
      case 'playing-moving':
        break
      case 'playing-rolling':
        const _game = game as NodotsGamePlayingRolling
        switchDice(_game)
    }
  }

  switch (game?.kind) {
    case 'initializing':
    case 'game-initialized':
    case 'rolling-for-start':
    case 'playing-moving':
      return <></>
    case 'playing-rolling':
      return <NodotsDiceSwitcherComponent color={color} />
  }
}

export default NodotsDiceSwitcher
