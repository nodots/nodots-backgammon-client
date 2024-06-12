import { NodotsPlayer } from './Player'
import { Color, GameRolling, generateId, generateTimestamp } from '.'
import {
  getDestinationForOrigin,
  getOriginsForColor,
} from './Play/move/helpers'
import { NodotsBoardStore } from './Board'
import { NodotsMove, NodotsMovePayload, PossibleMoves } from './Play/move'
import NodotsGameStore from '..'
import { Point } from './Checkercontainer'

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6
export type DieOrder = 0 | 1
export type Roll = [DieValue, DieValue]

interface Die {
  color: Color
  value: DieValue
  order: DieOrder
}

interface InactiveDie extends Die {
  kind: 'inactive'
}

interface ActiveDie extends Die {
  kind: 'active'
}

export type NodotsDie = InactiveDie | ActiveDie
export type NodotsDice = [NodotsDie, NodotsDie]

export const generateDice = (player: NodotsPlayer) => {
  const die1: InactiveDie = {
    kind: 'inactive',
    color: player.color,
    order: 0,
    value: 1,
  }
  const die2: InactiveDie = {
    kind: 'inactive',
    color: player.color,
    order: 1,
    value: 1,
  }
  const dice: NodotsDice = [die1, die2]
  return dice
}

const roll = (): DieValue => (Math.floor(Math.random() * 6) + 1) as DieValue

export const rollDice = (): Roll => [roll(), roll()]
export const isDoubles = (roll: Roll) => roll[0] === roll[1]
