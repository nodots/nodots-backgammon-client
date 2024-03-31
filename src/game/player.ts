import { Color, isColor, MoveDirection } from './Types'
import { Roll, DiePair, isDiePair } from '../components/Die/state/types/dice'
import { Board } from '../components/Board/state/types'
import { QuadrantLocation } from '../components/Quadrant/state/types'
import { Analytics } from './turn'
import { Die } from '../components/Die/state/types/die'

export interface InitializeTurnAction {
  board: Board
  player: Player
  roll: Roll
  analytics: Analytics[]
}

export type Player = {
  id: string
  username: string
  color: Color
  active: boolean
  dice?: DiePair
  moveDirection: MoveDirection
  pipCount: number
  automation: {
    move: boolean
    roll: boolean
  }
}

export const generateDice = (player: Player) => {
  const die1: Die = {
    order: 0,
    color: player.color,
  }
  const die2: Die = {
    order: 1,
    color: player.color,
  }
  const dice: DiePair = { dice: [die1, die2] }
  return dice
}
