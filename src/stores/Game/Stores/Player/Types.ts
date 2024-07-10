import {
  NodotsColor,
  MoveDirection,
  generateId,
  NodotsGameState,
  GameRollingForStart,
} from '../../Types'

export type INodotsPlayer = {
  id: string
  username: string
  color: NodotsColor
  direction: MoveDirection
  automation: {
    move: boolean
    roll: boolean
  }
  pipCount: number
}

export interface PlayerWaiting extends INodotsPlayer {
  kind: 'player-waiting'
}
export interface PlayerMoving extends INodotsPlayer {
  kind: 'player-moving'
}

export interface NodotsPlayers {
  black: INodotsPlayer
  white: INodotsPlayer
}

export interface NodotsPlayersInitializing {
  black: PlayerInitializing
  white: PlayerInitializing
}

export interface NodotsPlayersBlackRolling {
  black: PlayerRolling
  white: PlayerWaiting
}

export interface NodotsPlayersBlackMoving {
  black: PlayerMoving
  white: PlayerWaiting
}

export type NodotsPlayersBlackActive =
  | NodotsPlayersBlackRolling
  | NodotsPlayersBlackMoving

export interface NodotsPlayersWhiteRolling {
  black: PlayerWaiting
  white: PlayerRolling
}

export interface NodotsPlayersWhiteMoving {
  black: PlayerWaiting
  white: PlayerMoving
}

export type NodotsPlayersWhiteActive =
  | NodotsPlayersWhiteRolling
  | NodotsPlayersWhiteMoving
export interface NodotsPipCounts {
  black: number
  white: number
}

export interface PlayerWaiting extends INodotsPlayer {
  kind: 'player-waiting'
}

export interface PlayerInitializing extends INodotsPlayer {
  kind: 'player-initializing'
}

export interface PlayerRollingForStart extends INodotsPlayer {
  kind: 'player-rolling-for-start'
}

export interface PlayerRolling extends INodotsPlayer {
  kind: 'player-rolling'
}

export interface PlayerMoving extends INodotsPlayer {
  kind: 'player-moving'
}

export interface PlayerWinning extends INodotsPlayer {
  kind: 'player-winning'
}

export interface PlayerResiginging extends INodotsPlayer {
  kind: 'player-resigning'
}

export type NodotsPlayerState =
  | PlayerInitializing
  | PlayerRollingForStart
  | PlayerRolling
  | PlayerMoving
  | PlayerResiginging
  | PlayerWinning

export const initializing = (player: INodotsPlayer): PlayerInitializing => {
  return {
    kind: 'player-initializing',
    id: generateId(),
    username: player.username,
    color: player.color,
    direction: player.direction,
    automation: player.automation,
    pipCount: 167,
  }
}

export const setPlayersActive = (
  color: NodotsColor,
  players:
    | NodotsPlayersInitializing
    | NodotsPlayersBlackActive
    | NodotsPlayersWhiteActive
): NodotsPlayersBlackActive | NodotsPlayersWhiteActive => {
  console.log('[Types: Player] setPlayersActive color:', color)
  console.log('[Types: Player] setPlayersActive players:', players)
  switch (color) {
    case 'black':
      return {
        white: {
          ...players.white,
          kind: 'player-waiting',
        },
        black: {
          ...players.black,
          kind: 'player-rolling',
        },
      }
    case 'white':
      return {
        white: {
          ...players.white,
          kind: 'player-rolling',
        },
        black: {
          ...players.black,
          kind: 'player-waiting',
        },
      }
  }
}
