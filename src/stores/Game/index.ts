import { NodotsBoard, buildBoard } from './types/Board'
import { NodotsPlayers, PlayerWinning } from '../Player/Types'
import { NodotsPlay } from '../Play/Types'
import { NodotsCube } from './types/Cube'
import { Roll } from './types/Dice'
import { NodotsMessage } from './types/Message'
import { Color, generateId } from '../Types'

export class NodotsGame {
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
  plays: NodotsPlay[]

  constructor(players: NodotsPlayers) {
    this.players = players
    this.board = buildBoard(players)
    this.cube = {
      id: generateId(),
      value: 2,
      owner: undefined,
    }
    this.plays = []
  }
}

interface INodotsGame {
  id: string
  board: NodotsBoard
  players: NodotsPlayers
  cube: NodotsCube
  plays: NodotsPlay[]
  message?: NodotsMessage
}

export interface GameInitializing extends INodotsGame {
  kind: 'game-initializing'
}

export interface GameRollingForStart extends INodotsGame {
  kind: 'game-rolling-for-start'
  activeColor: Color
}

export interface GameCompleted extends INodotsGame {
  kind: 'game-completed'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
  winner: PlayerWinning
}
