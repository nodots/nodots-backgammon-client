import { Player } from './Player'
import { Color } from '.'

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type DieOrder = 0 | 1
export type Roll = [DieValue, DieValue]

export interface Die {
  color: Color
  value: DieValue
  order: DieOrder
}

export type Dice = [Die, Die]

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
  const dice: Dice = [die1, die2]
  return dice
}

const roll = (): DieValue => (Math.floor(Math.random() * 6) + 1) as DieValue
export const rollDice = (): Roll => [roll(), roll()]
