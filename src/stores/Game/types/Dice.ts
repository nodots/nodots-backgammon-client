import { NodotsColor } from '../Types'
import { NodotsPlayer, NodotsPlayers } from '../Stores/Player/Types'

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type DieOrder = 0 | 1
export type Roll = [DieValue, DieValue]

interface NodotsDie {
  color: NodotsColor
  value: DieValue
  order: DieOrder
}

export type NodotsPlayerDice = {
  dice: [NodotsDie, NodotsDie]
}
export interface NodotsPlayerDiceActive extends NodotsPlayerDice {
  kind: 'active'
  dice: [NodotsDie, NodotsDie]
}

export interface NodotsPlayerDiceInactive extends NodotsPlayerDice {
  kind: 'inactive'
  dice: [NodotsDie, NodotsDie]
}

export const generateDice = (color: NodotsColor): NodotsPlayerDiceInactive => {
  const die1: NodotsDie = {
    color,
    order: 0,
    value: 1,
  }
  const die2: NodotsDie = {
    color,
    order: 1,
    value: 1,
  }
  return {
    kind: 'inactive',
    dice: [die1, die2],
  }
}

const roll = (): DieValue => (Math.floor(Math.random() * 6) + 1) as DieValue

export const rollDice = (): Roll => [roll(), roll()]
export const isDoubles = (roll: Roll) => roll[0] === roll[1]

export const rollForStart = (players: NodotsPlayers): NodotsPlayer => {
  const whiteRoll = roll()
  const blackRoll = roll()
  if (whiteRoll === blackRoll) {
    return rollForStart(players)
  }
  return blackRoll > whiteRoll ? players.black : players.white
}
