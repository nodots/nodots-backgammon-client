import { NodotsColor, generateId } from '../../Types'
import { DieValue, Roll } from '../../types/Dice'
import { MoveInitializing, NodotsMove } from '../Move/Types'
import { NodotsPlayer, PlayerMoving, PlayerRolling } from '../Player/Types'

export interface NodotsPlay {
  kind:
    | 'play-initializing'
    | 'play-dice-switched'
    | 'play-doubling'
    | 'play-rolling'
    | 'play-moving'
    | 'play-moved'
    | 'play-confirming'
  id: string
}

export interface PlayInitializing extends NodotsPlay {
  kind: 'play-initializing'
}

export interface PlayRolling extends NodotsPlay {
  kind: 'play-rolling'
  activeColor: NodotsColor
  player: PlayerMoving | PlayerRolling
  moves: NodotsMove[]
}

export interface PlayDoubling extends NodotsPlay {
  kind: 'play-rolling'
  activeColor: NodotsColor
  player: PlayerMoving | PlayerRolling
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
  player: PlayerMoving | PlayerRolling
  roll: Roll
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

export interface PlayDiceSwitched extends NodotsPlay {
  kind: 'play-dice-switched'
  player: PlayerMoving | PlayerRolling
  roll: Roll
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
  activeColor: NodotsColor
  roll: Roll
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

// Transition to this state when the destination of the final move is set,
// i.e., second checker clicked.
export interface PlayMoved extends NodotsPlay {
  kind: 'play-moved'
  activeColor: NodotsColor
  roll: Roll
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

export interface PlayConfirming extends NodotsPlay {
  kind: 'play-confirming'
  activeColor: NodotsColor
  roll: Roll
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

export type NodotsPlayState =
  | PlayInitializing
  | PlayRolling
  | PlayDiceSwitched
  | PlayMoving
  | PlayDoubling
  | PlayConfirming

export const initializing = (
  player: PlayerRolling,
  roll: Roll
): PlayRolling => {
  const moves = buildMovesForRoll(roll, player)

  return {
    id: generateId(),
    kind: 'play-rolling',
    player,
    activeColor: player.color,
    moves,
  }
}

const buildMove = (
  dieValue: DieValue,
  player: NodotsPlayer
): MoveInitializing => {
  return {
    id: generateId(),
    kind: 'move-initializing',
    dieValue,
    isAuto: player.automation.move,
    direction: player.direction,
    isForced: false,
  }
}

const buildMovesForRoll = (roll: Roll, player: NodotsPlayer): NodotsMove[] => {
  const moves: NodotsMove[] = [
    buildMove(roll[0], player),
    buildMove(roll[1], player),
  ]

  return moves
}
