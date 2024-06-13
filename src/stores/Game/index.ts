import { NodotsBoard, buildBoard } from './types/Board'
import { NodotsPlayers, PlayerWinning } from '../Player/Types'
import { NodotsPlay } from '../Play/Types'
import { NodotsCube } from './types/Cube'
import { Roll } from './types/Dice'
import { NodotsMessage } from './types/Message'
import { Color } from '@mui/material'
import { generateId } from './types'

export class NodotsGame {
  activeStore: 'self' | 'players' | 'board' | 'cube' | 'play'
  players: NodotsPlayers
  board: NodotsBoard
  cube: NodotsCube
  plays: NodotsPlay[]

  constructor(players: NodotsPlayers) {
    this.players = players
    this.board = buildBoard(players)
    this.activeStore = 'play'
    this.cube = {
      id: generateId(),
      value: 2,
      owner: undefined,
    }
    this.plays = []
  }
}

export interface GameInitializing extends NodotsGame {
  kind: 'game-initializing'
  activeStore: 'self'
}

export interface GameRollingForStart extends NodotsGame {
  kind: 'game-rolling-for-start'
  activeColor: Color
}

export interface GameRolling extends NodotsGame {
  kind: 'game-rolling'
  activeColor: Color
}

export interface GamePlaying extends NodotsGame {
  kind: 'game-playing'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface GameCompleted extends NodotsGame {
  kind: 'game-completed'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
  winner: PlayerWinning
}
