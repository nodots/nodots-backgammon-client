import { CheckerboxPosition, NodotsGame } from '../Types'

// This all probably belongs elsewhere. FIXME

export interface NodotsGameStateHistoryEvent {
  timestamp: string
  state: NodotsGame
}
export interface NodotsCheckercontainerImport {
  position: CheckerboxPosition
  checkercount: number
}

export type NodotsBoardImport = NodotsCheckercontainerImport[]

export interface NodotsBoardImports {
  clockwise: NodotsBoardImport
  counterclockwise: NodotsBoardImport
}
