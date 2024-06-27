import { NodotsColor } from '../../Types'
import { NodotsPlayers, NodotsPlayer } from '../Player/Types'

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type DieOrder = 0 | 1
export type NodotsRoll = [DieValue, DieValue]

interface NodotsDie {
  color: NodotsColor
  value: DieValue
  order: DieOrder
}

export type NodotsPlayerDice = {
  color: NodotsColor
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

export type NodotsPlayerDiceState =
  | NodotsPlayerDiceActive
  | NodotsPlayerDiceInactive

export type NodotsPlayersDiceWhite = {
  white: NodotsPlayerDiceActive
  black: NodotsPlayerDiceInactive
}

export type NodotsPlayersDiceBlack = {
  white: NodotsPlayerDiceInactive
  black: NodotsPlayerDiceActive
}

export type NodotsPlayersDiceInactive = {
  white: NodotsPlayerDiceInactive
  black: NodotsPlayerDiceInactive
}

export const initializing = (color: NodotsColor): NodotsPlayerDiceInactive => {
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
    color,
    dice: [die1, die2],
  }
}

export const setActive = (
  diceState: NodotsPlayerDiceInactive
): NodotsPlayerDiceActive => {
  // console.log('[Types: Dice] setActive diceState:', diceState)
  return {
    ...diceState,
    kind: 'active',
    dice: [diceState.dice[0], diceState.dice[1]],
  }
}

export const roll = (): DieValue =>
  (Math.floor(Math.random() * 6) + 1) as DieValue

export const rollDice = (): NodotsRoll => [roll(), roll()]
export const isDoubles = (roll: NodotsRoll) => roll[0] === roll[1]

export const rolling = (
  diceState: NodotsPlayerDiceActive
): NodotsPlayerDiceInactive => {
  const roll = rollDice()
  diceState.dice[0].value = roll[0]
  diceState.dice[1].value = roll[1]
  return {
    ...diceState,
    kind: 'inactive',
    dice: [diceState.dice[0], diceState.dice[1]],
  }
}
