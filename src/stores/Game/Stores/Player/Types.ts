import { NodotsColor, MoveDirection, generateId } from '../../Types'

export type NodotsPlayer = {
  username: string
  color: NodotsColor
  direction: MoveDirection
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

export interface PlayerReady extends NodotsPlayer {
  kind: 'player-ready'
  id: string
  pipCount: number
}

export interface PlayerRolling extends NodotsPlayer {
  kind: 'player-rolling'
  id: string
  pipCount: number
}

export interface PlayerMoving extends NodotsPlayer {
  kind: 'player-moving'
  id: string
  pipCount: number
}

export interface PlayerWinning extends NodotsPlayer {
  kind: 'player-winning'
  id: string
  pipCount: number
}

export interface PlayerResiginging extends NodotsPlayer {
  kind: 'player-resigning'
  id: string
  pipCount: number
}

export type NodotsPlayerState =
  | PlayerInitializing
  | PlayerReady
  | PlayerRolling
  | PlayerMoving
  | PlayerResiginging
  | PlayerWinning

export const initializing = (player: NodotsPlayer): PlayerReady => {
  return {
    kind: 'player-ready',
    id: generateId(),
    username: player.username,
    color: player.color,
    direction: player.direction,
    automation: player.automation,
    pipCount: 167,
  }
}
