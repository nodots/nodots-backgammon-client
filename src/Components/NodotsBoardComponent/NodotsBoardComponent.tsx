import { NodotsColor } from '../../../nodots_modules/backgammon-types/index'
import useNodotsGame from '../../Contexts/Game/GameHook'
import { NodotsBoard } from './NodotsBoard'

export interface NodotsDirectionColors {
  clockwiseColor: NodotsColor
  counterclockwiseColor: NodotsColor
}

export const NodotsBoardComponent = () => {
  const directionColors: NodotsDirectionColors = {
    clockwiseColor: 'black',
    counterclockwiseColor: 'white',
  }
  return <NodotsBoard />
}
