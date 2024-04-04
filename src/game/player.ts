import {
  Board,
  Color,
  Die,
  DiePair,
  DieValue,
  MoveDirection,
  Roll,
} from './Types'

export interface InitializeTurnAction {
  board: Board
  player: Player
  roll: Roll
  // analytics: Analytics[]
}

export type Player = {
  id: string
  username: string
  color: Color
  dice: DiePair
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
    value: 1,
  }
  const die2: Die = {
    order: 1,
    color: player.color,
    value: 1,
  }
  const dice: DiePair = [die2, die2]
  return dice
}

const roll = (): DieValue => (Math.floor(Math.random() * 6) + 1) as DieValue

export const rollDice = (player: Player): Roll => [roll(), roll()]
