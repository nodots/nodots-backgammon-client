import { Color } from '../Types'
import { NodotsCube } from '../Game/types/Cube'
import { Roll } from '../Game/types/Dice'
import { NodotsMove } from '../Move/Types'
import { PlayerPlaying, PlayerRolling } from '../Player/Types'

export interface NodotsPlay {
  id: string
  player: PlayerPlaying | PlayerRolling
  roll: Roll
  isAuto: boolean
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[] // FIXME: this should either be an array of 2 or 4 moves
}

export interface PlayInitializing extends NodotsPlay {
  kind: 'play-initializing'
}

export interface PlaySwitchingDice extends NodotsPlay {
  kind: 'play-switching-dice'
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
}

export interface PlayRolling extends NodotsPlay {
  kind: 'play-rolling'
  activeColor: Color
  roll: Roll
}

export interface PlayRolled extends NodotsPlay {
  kind: 'play-rolled'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayDoubling extends NodotsPlay {
  kind: 'play-doubling'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayDoubled extends NodotsPlay {
  kind: 'play-doubled'
  activeColor: Color
  roll: Roll
  cube: NodotsCube
  plays: NodotsPlay[]
}

export interface PlayDiceSwitched extends NodotsPlay {
  kind: 'play-dice-switched'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayMoved extends NodotsPlay {
  kind: 'play-moved'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayConfirmingPlay extends NodotsPlay {
  kind: 'play-confirming'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayConfirmed extends NodotsPlay {
  kind: 'play-confirmed'
  activeColor: Color
  roll: Roll
  plays: NodotsPlay[]
}
