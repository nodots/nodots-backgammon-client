import { NodotsColor, generateId } from '../../Types'
import { Roll } from '../../types/Dice'
import { NodotsMove } from '../Move/Types'
import { PlayerPlaying, PlayerRolling } from '../Player/Types'

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
  player: PlayerPlaying | PlayerRolling
  isAuto: boolean
}

export interface PlayDoubling extends NodotsPlay {
  kind: 'play-rolling'
  activeColor: NodotsColor
  player: PlayerPlaying | PlayerRolling
  isAuto: boolean
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
  state: NodotsPlay
  player: PlayerPlaying | PlayerRolling
  roll: Roll
  isAuto: boolean
  isForced: boolean
  analysis: {
    options: []
  }
  moves: NodotsMove[]
}

export interface PlayDiceSwitched extends NodotsPlay {
  kind: 'play-dice-switched'
  activeColor: NodotsColor
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayMoving extends NodotsPlay {
  kind: 'play-moving'
  activeColor: NodotsColor
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayMoved extends NodotsPlay {
  kind: 'play-moved'
  activeColor: NodotsColor
  roll: Roll
  plays: NodotsPlay[]
}

export interface PlayConfirming extends NodotsPlay {
  kind: 'play-confirming'
  activeColor: NodotsColor
  roll: Roll
  plays: NodotsPlay[]
}

export type NodotsPlayState =
  | PlayInitializing
  | PlayRolling
  | PlayDiceSwitched
  | PlayMoving
  | PlayDoubling
  | PlayConfirming

export const initializing = (player: PlayerRolling): PlayRolling => {
  return {
    id: generateId(),
    kind: 'play-rolling',
    player,
    activeColor: player.color,
    isAuto: player.automation.move,
  }
}
