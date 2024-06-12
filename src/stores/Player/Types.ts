import { MoveDirection, Color } from '../Game/types/index'
import { NodotsDice } from '../Game/types/Dice'

export interface NodotsPlayer {
  id: string
  username: string
  color: Color
  dice: NodotsDice
  direction: MoveDirection
  pipCount: number
  automation: {
    move: boolean
    roll: boolean
  }
}

export interface NodotsPlayers {
  black: NodotsPlayer
  white: NodotsPlayer
}

export interface NodotsPipCounts {
  black: number
  white: number
}

export interface PlayerInitializing extends NodotsPlayer {
  kind: 'player-initializing'
}

export interface PlayerRolling extends NodotsPlayer {
  kind: 'player-rolling'
}

export interface PlayerPlaying extends NodotsPlayer {
  kind: 'player-playing'
}

export interface PlayerWinning extends NodotsPlayer {
  kind: 'player-winning'
}

export interface PlayerResiginging extends NodotsPlayer {
  kind: 'player-resigning'
}
