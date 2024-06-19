import { MoveDirection } from '../Game/Types'
import { NodotsBoard } from '../Game/types/Board'
import { DieValue } from '../Game/types/Dice'
import { NodotsPlayer, NodotsPlayers } from '../Player/Types'
import { Checkercontainer } from '../Game/types/Checkercontainer'
import { NodotsChecker } from '../Game/types/Checker'

export interface NodotsMovePayload {
  state: NodotsMove
  checker: NodotsChecker
  origin: Checkercontainer
  destination: Checkercontainer
  moves: NodotsMove[]
  move: NodotsMove
  players: NodotsPlayers
}

export interface NodotsMove {
  id: string
  isAuto: boolean
  isForced: boolean
  board: NodotsBoard
  player: NodotsPlayer
  dieValue: DieValue
  direction: MoveDirection
}

export interface MoveInitializing extends NodotsMove {
  kind: 'move-initializing'
}
