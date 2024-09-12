import { NodotsColor } from '../../../nodots_modules/backgammon-types/index'
// import { useNodotsGame } from '../../Contexts/Game/useNodotsGame'
import { NodotsBoard } from './NodotsBoard'

export interface NodotsDirectionColors {
  clockwiseColor: NodotsColor
  counterclockwiseColor: NodotsColor
}

export const NodotsBoardComponent = () => {
  // const { game, getColorsByDirection } = useNodotsGame()
  // console.log('[NodotsBoardComponent] game:', game)
  return <NodotsBoard />
}
