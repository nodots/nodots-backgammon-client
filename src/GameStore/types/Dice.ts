import { NodotsPlayer, Player } from './Player'
import { Color, Rolling, generateId, generateTimestamp } from '.'
import { getDestinationForOrigin, getOriginsForColor } from './move/helpers'
import { NodotsBoardStore } from './Board'
import { NodotsMove, PossibleMoves } from './move'
import NodotsGameStore from '..'

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

export const generateDice = (player: Player) => {
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

export const rollDiceWithMoves = (
  board: NodotsBoardStore,
  player: NodotsPlayer
) => {
  const roll = rollDice()
  const origins = getOriginsForColor(board, player.color)

  const moves: NodotsMove[] = []

  const move1: NodotsMove = {
    id: generateId(),
    dieValue: roll[0],
    player,
    direction: player.direction,
    from: undefined,
    to: undefined,
    checker: undefined,
    completed: false,
    timestamp: generateTimestamp(),
  }
  const move2: NodotsMove = {
    id: generateId(),
    dieValue: roll[1],
    player,
    direction: player.direction,
    from: undefined,
    to: undefined,
    checker: undefined,
    completed: false,
    timestamp: generateTimestamp(),
  }

  moves.push(move1)
  moves.push(move2)

  if (roll[0] === roll[1]) {
    const move3: NodotsMove = {
      id: generateId(),
      dieValue: roll[0],
      player,
      direction: player.direction,
      from: undefined,
      to: undefined,
      checker: undefined,
      completed: false,
      timestamp: generateTimestamp(),
    }
    const move4: NodotsMove = {
      id: generateId(),
      dieValue: roll[1],
      player,
      direction: player.direction,
      from: undefined,
      to: undefined,
      checker: undefined,
      completed: false,
      timestamp: generateTimestamp(),
    }
    moves.concat(move3, move4)
  }
  return { roll, moves }
}
